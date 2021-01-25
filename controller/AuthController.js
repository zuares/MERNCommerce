const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const user = await User.findOne({ email });
            if (user) return res.status(400).json({ message: "The email already exists" });
            if (password.length < 6) return res.status(400).json({ message: "Password too short" });
            const newUser = await new User({ name, email, password: await bcrypt.hash(password, 12) });
            const accessToken = createAccessToken({ id: newUser._id });
            const refreshToken = createRefreshToken({ id: newUser._id });
            // newUser.save();
            res.cookie('refreshToken', refreshToken, { httpOnly: true, path: '/auth/refresh_token' });
            return res.json(accessToken)
            // return res.json({ message: 'Register success', data: newUser });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: 'User doesnt exists' });
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: `Password incorect` });

            const accessToken = createAccessToken({ id: user._id });
            const refreshToken = createRefreshToken({ id: user._id });

            res.cookie('refreshToken', refreshToken, { httpOnly: true, path: '/auth/refresh_token' });
            return res.json(accessToken)
            // res.json({ message: 'Login success' });

        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie('refreshToken', { path: '/auth/refresh_token' });
            return res.json({ message: 'Logout' });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    refreshToken: (req, res) => {

        try {
            const rf_token = req.cookies.refreshToken;
            if (!rf_token) return res.status(400).json({ message: 'Please Login or register' });

            jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) => {
                if (err) return res.status(400).json({ message: "Please login or register" });
                const accessToken = createAccessToken({ id: user.id });
                res.json({ user, accessToken });
            });

        } catch (err) {
            return res.status(500).json({ message: err.message });
        }

    },

    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            if (!user) return res.status(400).json({ msg: "User doesnt exists" });

            res.json(user);
        } catch (err) {
            return res.status(500).json({ er: err.message });
        }
    }

}


const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '1d' });
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN, { expiresIn: '7d' });
}

module.exports = AuthController;