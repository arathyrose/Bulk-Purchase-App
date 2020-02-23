const mongoose = require('mongoose');
let User = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    address: {
        type: String
    },
    phone: {
        type: String,
    },
    type: {
        type: String,
        enum: ['Vendor', 'Customer']
    }
});
module.exports = mongoose.model('User', User);