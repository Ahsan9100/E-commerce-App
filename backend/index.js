const express = require("express");
const mongoose = require("mongoose");

const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
    .connect("mongodb://127.0.0.1:27017/ecommerce_db")
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => console.log(err));

// Routes
app.use("/api/products", productRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("E-Commerce API Running...");
});

// Server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running on Port ${PORT}`);
});