const User = require('../models/UserModel');

const authAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({
            _id: req.user.id
        });
        if (user.role === 0) return res.status(400).json({ message: "Access dinied" });
        next();
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = authAdmin;