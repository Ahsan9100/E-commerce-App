const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    addToCart,
    getCart,
    updateCart,
    removeFromCart,
    clearCart,
} = require("../controllers/cartController");

// Add To Cart
router.post("/", protect, addToCart);

router.get("/", protect, getCart);

router.put("/:id", protect, updateCart);

router.delete("/:id", protect, removeFromCart);

router.delete("/", protect, clearCart);

module.exports = router;