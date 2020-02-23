const mongoose = require('mongoose');
let VendorRating = new mongoose.Schema({
    customer: {
        type: String,
        required: true
    },
    vendor: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('VendorRating', VendorRating);