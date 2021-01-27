
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
    },
    role: {
        type: Number,
        default: 0
    },
    cart: {
        type: Array,
        required: true,
        default: []
    }

},
    {
        timestamps: true
    }

);

module.exports = mongoose.model('User', userSchema);