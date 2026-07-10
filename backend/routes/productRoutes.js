const express = require("express");

const router = express.Router();

const {
    addProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");

// POST Product
router.post("/", addProduct);

// GET ALL PRODUCTS
router.get("/", getProducts);

// GET SINGLE PRODUCT
router.get("/:id", getSingleProduct);

// UPDATE PRODUCT
router.put("/:id", updateProduct);
// DELETE PRODUCT
router.delete("/:id", deleteProduct);
module.exports = router;