const Category = require('../models/categoryModel');

const categoryController = {

    index: async (req, res) => {
        try {
            const items = await Category.find();
            return res.json({ data: items })
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
    show: async (req, res) => {
        try {
            const item = await Category.findById(req.params.id);
            if (!item) return res.status(400).json({ message: "Category not found" });
            return res.json(item)
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
    create: async (req, res) => {
        try {
            const { name } = req.body;
            const category = await Category.findOne({ name });
            if (category) return res.status(400).json({ message: 'This category has already' });
            const newCategory = await new Category({ name });
            await newCategory.save();
            return res.json(newCategory);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
    delete: async (req, res) => {
        try {
            await Category.findByIdAndDelete(req.params.id);
            return res.json({ message: `Deleted category` });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
    update: async (req, res) => {
        try {
            const { name } = req.body;
            await Category.findByIdAndUpdate(req.params.id, { name });
            return res.json({ message: `Update successfull` });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },


}


module.exports = categoryController;