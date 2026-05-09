const connectUserDB = require('./.config/mongoDB.config.js')
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRegisteration.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Configure CORS to allow frontend requests
app.use(cors({
    origin: ["http://localhost:5173", "https://shyara-gold.netlify.app"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

connectUserDB().catch(err => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/auth', userRoutes)


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})