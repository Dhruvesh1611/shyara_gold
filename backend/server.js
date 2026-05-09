const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./config/cloudinaryConfig');
const connectUserDB = require('./.config/mongoDB.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRoutes = require('./routes/userRegisteration');
require('dotenv').config();

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: ["http://localhost:5173", "https://shyara-gold.netlify.app"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

const PORT = process.env.PORT || 4001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Add this to your .env file

const homeUri = process.env.HOME_MONGO_URI;
const usersUri = process.env.USERS_MONGO_URI;

let homeDb, bestSellingItems;
let usersDb, usersDesignData, usersCollection;

connectUserDB()

async function initializeDatabase() {
    try {
        if (!homeUri || !usersUri) throw new Error("MongoDB URIs are not set in environment variables");

        const homeClient = new MongoClient(homeUri);
        await homeClient.connect();
        homeDb = homeClient.db("home_page");
        bestSellingItems = homeDb.collection("best_selling_items");

        const usersClient = new MongoClient(usersUri);
        await usersClient.connect();
        usersDb = usersClient.db("users_collection");
        usersDesignData = usersDb.collection("users_design_data");
        usersCollection = usersDb.collection("users"); // New collection for user accounts

        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err);
        process.exit(1);
    }
}
initializeDatabase();

// Mount user registration routes
app.use('/auth', userRoutes);

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.status(401).json({ message: "Access denied" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
};

// User Signup
app.post('/signup', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        
        if (!email || !password || !name) {
            return res.status(400).json({ message: "Email, password, and name are required" });
        }

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            email,
            password: hashedPassword,
            name,
            role: 'user', // Default role
            createdAt: new Date()
        };

        await usersCollection.insertOne(user);
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

// User/Admin/Owner Login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await usersCollection.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user._id, email: user.email, role: user.role, name: user.name }
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

// Protected routes with role-based access
const checkRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        next();
    };
};

// Existing routes with authentication
app.get('/users_design_data', authenticateToken, async (req, res) => {
    try {
        if (!usersDesignData) {
            return res.status(500).json({ message: "Database not initialized yet" });
        }
        const designs = await usersDesignData.find({}).toArray();
        res.status(200).json(designs);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

app.get('/best_selling_items', authenticateToken, async (req, res) => {
    try {
        if (!bestSellingItems) {
            return res.status(500).json({ message: "Database not initialized yet" });
        }
        const items = await bestSellingItems.find({}).toArray();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

const userDesignStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'users_design_data',
        format: async () => 'png',
        public_id: (req, file) => file.originalname.split('.')[0],
    },
});
const userDesignUpload = multer({ storage: userDesignStorage });

app.post('/users_design_data/upload', 
    authenticateToken,
    userDesignUpload.single('image'), 
    async (req, res) => {
        try {
            const { name, email, description } = req.body;

            if (!name || !email || !description || !req.file) {
                return res.status(400).json({ message: "❌ Name, email, description, and image are required" });
            }

            const imageUrl = req.file.path;
            const newDesign = { 
                name, 
                email, 
                description, 
                imageUrl,
                uploadedBy: req.user.id,
                uploadedAt: new Date()
            };

            await usersDesignData.insertOne(newDesign);
            res.status(201).json({ message: "✅ Design added successfully", data: newDesign });
        } catch (err) {
            res.status(500).json({ message: "Internal Server Error", error: err.message });
        }
    }
);

