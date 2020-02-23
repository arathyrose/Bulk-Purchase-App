const mongoose = require('mongoose');
let Product = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    total_quantity: {
        type: Number,
        required: true
    },
    quantity_remaining:{
        type: Number,
        required: true
    },
    vendor: {
        type: String,
        required: true
    },
    images: {
        type: String,
        default: ""
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['Waiting', 'Placed', 'Dispatched', 'Cancelled'],
        default: 'Waiting'
    }
});
module.exports = mongoose.model('Product', Product);