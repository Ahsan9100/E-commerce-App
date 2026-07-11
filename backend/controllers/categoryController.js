
const Category = require("../models/categoryModel");

// Create Category
const createCategory = async (req, res) => {
    try {
        const { name, description, image } = req.body;

        const category = await Category.create({
            name,
            description,
            image,
        });

        res.status(201).json({
            success: true,
            message: "Category Created Successfully",
            data: category,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createCategory,
};