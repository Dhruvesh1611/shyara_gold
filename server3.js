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
        folder: 'shyara_gold_rings', // Folder in Cloudinary
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

let allCollectionsDb, ringCollection;

// ✅ Initialize MongoDB Connection
async function initializeDatabase() {
    try {
        if (!allCollectionsUri) throw new Error("MongoDB URI is missing");

        const client = new MongoClient(allCollectionsUri);
        await client.connect();
        allCollectionsDb = client.db("all_collections");
        ringCollection = allCollectionsDb.collection("ring");

        app.listen(PORT, () => {
            console.log(`🚀 Server 2 running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err);
        process.exit(1);
    }
}
initializeDatabase();

// ✅ Fetch All Rings (with optional filtering by type)
app.get('/rings', async (req, res) => {
    try {
        const { type } = req.query; // Get type from query params
        const filter = type ? { type } : {}; // Apply filter if type is provided
        const rings = await ringCollection.find(filter).toArray();
        res.status(200).json(rings);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

// ✅ Upload a New Ring with Cloudinary
app.post('/rings/upload', upload.array('images', 5), async (req, res) => {
    try {
        console.log("🛠️ Received files:", req.files); // Debugging log
        console.log("🛠️ Received body:", req.body); // Debugging log

        const { name, type } = req.body;

        if (!name || !type || !req.files || req.files.length === 0) {
            return res.status(400).json({ message: "❌ Name, type, and images are required" });
        }

        // Extract image URLs from Cloudinary response
        const imageUrls = req.files.map(file => file.path);

        console.log("✅ Image URLs:", imageUrls); // Debugging log

        const newRing = { name, type, imageUrls };

        await ringCollection.insertOne(newRing);

        res.status(201).json({ message: "✅ Ring design added successfully", data: newRing });
    } catch (err) {
        console.error("❌ Upload Error:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});





// ✅ Delete a Ring by ID
app.delete('/rings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ringCollection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "❌ Ring not found" });
        }

        res.status(200).json({ message: "✅ Ring deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});