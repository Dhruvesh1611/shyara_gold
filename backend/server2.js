const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// ✅ Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// ✅ Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'shyara_gold',
        allowed_formats: ['jpg', 'png', 'jpeg']
    }
});

const upload = multer({ storage });

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "https://shyara-gold.netlify.app"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

const PORT = process.env.PORT || 4002;
const allCollectionsUri = process.env.ALL_COLLECTIONS_MONGO_URI;

let allCollectionsDb;
const collections = {};
const categories = ["ring", "bangle", "bracelet", "chain", "earring", "mangalsutra", "necklace", "pendant"];

// ✅ Initialize MongoDB Connection
async function initializeDatabase() {
    try {
        if (!allCollectionsUri) throw new Error("MongoDB URI is missing");

        const client = new MongoClient(allCollectionsUri);
        await client.connect();
        allCollectionsDb = client.db("all_collections");
        
        categories.forEach(category => {
            collections[category] = allCollectionsDb.collection(category);
        });

        app.listen(PORT, () => {
            console.log(`🚀 Server 2 running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err);
        process.exit(1);
    }
}
initializeDatabase();

// ✅ Generate CRUD routes dynamically for all categories
categories.forEach(category => {
    // Fetch All Items
    app.get(`/${category}s`, async (req, res) => {
        try {
            const { type } = req.query;
            const filter = type ? { type } : {};
            const items = await collections[category].find(filter).toArray();
            res.status(200).json(items);
        } catch (err) {
            res.status(500).json({ message: "Internal Server Error", error: err.message });
        }
    });

    // Upload a New Item
    app.post(`/${category}s/upload`, upload.array('images', 5), async (req, res) => {
        try {
            const { name, type } = req.body;
            if (!name || !type || !req.files || req.files.length === 0) {
                return res.status(400).json({ message: "❌ Name, type, and images are required" });
            }

            const imageUrls = req.files.map(file => file.path);
            const newItem = { name, type, imageUrls };

            await collections[category].insertOne(newItem);
            res.status(201).json({ message: `✅ ${category} design added successfully`, data: newItem });
        } catch (err) {
            res.status(500).json({ message: "Internal Server Error", error: err.message });
        }
    });

    // Delete an Item by ID
    app.delete(`/${category}s/:id`, async (req, res) => {
        try {
            const { id } = req.params;
            const result = await collections[category].deleteOne({ _id: new ObjectId(id) });

            if (result.deletedCount === 0) {
                return res.status(404).json({ message: `❌ ${category} not found` });
            }

            res.status(200).json({ message: `✅ ${category} deleted successfully` });
        } catch (err) {
            res.status(500).json({ message: "Internal Server Error", error: err.message });
        }
    });
});
