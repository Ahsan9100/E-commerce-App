const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

// PLACE ORDER

const placeOrder = async (req, res) => {
    try {

        const { shippingAddress, paymentMethod } = req.body;

        // Get User Cart
        const cartItems = await Cart.find({
            user: req.user.id,
        }).populate("product");

        if (cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is Empty",
            });
        }

        let totalPrice = 0;

        const products = cartItems.map((item) => {

            totalPrice += item.product.price * item.quantity;

            return {
                product: item.product._id,
                quantity: item.quantity,
            };
        });

        // Create Order
        const order = await Order.create({
            user: req.user.id,
            products,
            totalPrice,
            shippingAddress,
            paymentMethod,
        });

        // Clear Cart
        await Cart.deleteMany({
            user: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: "Order Placed Successfully",
            data: order,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};
// GET MY ORDERS

const getMyOrders = async (req, res) => {
    try {

        const orders = await Order.find({
            user: req.user.id,
        })
            .populate("user", "name email")
            .populate("products.product");

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// GET ORDER BY ID

const getOrderById = async (req, res) => {
    try {

        const order = await Order.findById(req.params.id)
            .populate("user", "name email")
            .populate("products.product");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found",
            });
        }

        res.status(200).json({
            success: true,
            data: order,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// UPDATE ORDER STATUS

const updateOrderStatus = async (req, res) => {
    try {

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found",
            });
        }

        order.orderStatus = req.body.orderStatus;
        await order.save();

        res.status(200).json({
            success: true,
            message: "Order Status Updated Successfully",
            data: order,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// GET ALL ORDERS (ADMIN)

// GET ALL ORDERS (ADMIN)

const getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find()
            .populate("user", "name email")
            .populate("products.product");

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// CANCEL ORDER (USER)

const cancelOrder = async (req, res) => {
    try {

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found",
            });
        }

        if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Unauthorized Access",
            });
        }

        order.orderStatus = "Cancelled";
        await order.save();

        res.status(200).json({
            success: true,
            message: "Order Cancelled Successfully",
            data: order,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


module.exports = {
    placeOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    getAllOrders,
    cancelOrder,
};