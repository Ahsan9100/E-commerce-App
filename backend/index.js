const express = require("express");

const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");

const productRoute = require("./routes/productRoutes");
const categoryRoute = require("./routes/categoryRoute");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/products", productRoute);

app.use("/api/category", categoryRoute);

app.use("/api/auth", authRoute);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});