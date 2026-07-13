const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");

const productRoute = require("./routes/productRoutes");
const categoryRoute = require("./routes/categoryRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/products", productRoute);

app.use("/api/categories", categoryRoute);

app.use("/api/auth", authRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});