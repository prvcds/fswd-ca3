const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Model
const InventoryItem = mongoose.model("InventoryItem", new mongoose.Schema({
    name: String,
    quantity: Number
}));

// GET all items
app.get("/items", async (req, res) => {
    try {
        const items = await InventoryItem.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch items" });
    }
});

// POST new item
app.post("/items", async (req, res) => {
    try {
        const { name, quantity } = req.body;
        if (!name || !quantity) {
            return res.status(400).json({ error: "Name and quantity are required" });
        }

        const newItem = new InventoryItem({ name, quantity });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: "Failed to add item" });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error("MongoDB connection failed:", err));
