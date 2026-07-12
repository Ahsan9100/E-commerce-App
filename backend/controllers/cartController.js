const Cart = require("../models/cartModel");
const Product = require("../models/Product");

// ADD TO CART
const addToCart = async (req, res) => {
    try {

        const { product, quantity } = req.body;

        // Check Product Exists
        const productExists = await Product.findById(product);

        if (!productExists) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found",
            });
        }

        // Check if product already exists in user's cart
        const existingCart = await Cart.findOne({
            user: req.user.id,
            product: product,
        });

        if (existingCart) {

            existingCart.quantity += quantity || 1;

            await existingCart.save();

            return res.status(200).json({
                success: true,
                message: "Cart Updated Successfully",
                data: existingCart,
            });
        }

        // Create New Cart Item
        const cart = await Cart.create({
            user: req.user.id,
            product,
            quantity,
        });

        res.status(201).json({
            success: true,
            message: "Product Added To Cart",
            data: cart,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};
// GET USER CART

const getCart = async (req, res) => {
    try {

        const cart = await Cart.find({
            user: req.user.id,
        })
            .populate("product")
            .populate("user", "name email");

        res.status(200).json({
            success: true,
            count: cart.length,
            data: cart,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};
// UPDATE CART QUANTITY

const updateCart = async (req, res) => {
    try {

        const { quantity } = req.body;

        const cart = await Cart.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart Item Not Found",
            });
        }

        cart.quantity = quantity;

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart Updated Successfully",
            data: cart,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};
// REMOVE FROM CART

const removeFromCart = async (req, res) => {
    try {

        const cart = await Cart.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart Item Not Found",
            });
        }

        await cart.deleteOne();

        res.status(200).json({
            success: true,
            message: "Item Removed From Cart",
            data: cart,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// CLEAR USER CART

const clearCart = async (req, res) => {
    try {

        await Cart.deleteMany({
            user: req.user.id,
        });

        res.status(200).json({
            success: true,
            message: "Cart Cleared Successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};
module.exports = {
    addToCart,
    getCart,
    updateCart,
    removeFromCart,
    clearCart,
};