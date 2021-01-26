
const Product = require('../models/productModel');


class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        const queryObj = { ...this.queryString };
        const exludefFields = ['page', 'sort', 'limit'];
        exludefFields.forEach(el => delete (queryObj[el]));
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);
        this.query.find(JSON.parse(queryStr));
        return this;
    }
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    // paginating() {
    //     const page = this.queryString.page * 1 || 1;
    //     const limit = this.queryString.limit * 1 || 3;
    //     const skip = (page - 1) * limit;

    //     this.query = this.query.skip(skip).limit(limit);
    //     return this;
    // }
}

const ProductController = {

    index: async (req, res) => {
        try {
            const features = new APIfeatures(Product.find(), req.query).filtering().sorting();
            const items = await features.query
            return res.json({ status: "success", items: items.length, item: items });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
    show: async (req, res) => {
        try {
            const item = await Product.findById(req.params.id);
            if (!item) return res.status(400).json({ message: "Product not found" });
            return res.json(item)
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
    create: async (req, res) => {
        try {
            const { product_id, title, price, description, content, images, category } = req.body;
            if (!images) return res.status(400).json({ message: "No image upload" });
            const item = await Product.findOne({ title });
            if (item) return res.status(400).json({ message: 'This product has already' });
            const newProduct = await new Product({ product_id, title: title.toLowerCase(), price, description, content, images, category });
            await newProduct.save();
            return res.json(newProduct);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
    delete: async (req, res) => {
        try {
            await Product.findByIdAndDelete(req.params.id);
            return res.json({ message: `Deleted category` });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
    update: async (req, res) => {
        try {
            const { title, price, description, content, category, images } = req.body;
            await Product.findByIdAndUpdate(req.params.id, { title, price, description, content, category, images });
            return res.json({ message: `Update successfull` });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

}


module.exports = ProductController;