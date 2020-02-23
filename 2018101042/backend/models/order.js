const mongoose = require('mongoose');
let Order = new mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    vendor: {
        type: String,
        required: true
    },
    customer: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
    },
    review: {
        type: String,
    }
});
module.exports = mongoose.model('Order', Order);
