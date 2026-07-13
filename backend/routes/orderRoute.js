const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    placeOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    getAllOrders,
    cancelOrder,
} = require("../controllers/orderController");

router.post("/", protect, placeOrder);
router.get("/", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id", protect, updateOrderStatus);
router.put("/cancel/:id", protect, cancelOrder);

// Admin Routes
router.get("/admin", protect, getAllOrders);
router.put("/admin/:id", protect, updateOrderStatus);
module.exports = router;