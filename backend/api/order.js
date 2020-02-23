var express = require('express');
let Order = require('../models/order')
const vendorRoutes = express.Router();
// Get all orders
vendorRoutes.route('/order/showall').get(function (req, res) {
    Order.find(function (err, orders) {
        if (err) {
            console.log(err);
        } else {
            res.json(orders);
        }
    });
});
// Add a new order
vendorRoutes.route('/order/add').post(function (req, res) {
    let order = new Order(req.body);
    order
        .save()
        .then(order => { res.status(200).json({ 'Status': 'Successful' }) })
        .catch(err => { res.status(400).json({ 'Status': err }) });
});
// Get order by id
vendorRoutes.route('/order/:id').get(function (req, res) {
    let id = req.params.id;
    Order.findById(id, function (err, order) {
        res.json(order);
    });
});
// Get all orders by customer id
vendorRoutes.route('/order/customer/:id').get(function (req, res) {
    let id = req.params.id;
    console.log(id)
    Order.find({ "customer": id }, function (err, order) {
        if (err) {
            console.log(err);
        } else {
            if (order != undefined) {
                res.json(order);
            }
            else {
                console.log(err);
            }
        }
    });
});

// Get all orders by vendor
vendorRoutes.route('/order/vendor/:id').get(function (req, res) {
    let id = req.params.id;
    Order.find({ "vendor": id }, function (err, order) {
        if (err) {
            console.log(err);
        } else {
            if (order != undefined) {
                res.json(order);
            }
            else {
                console.log(err);
            }
        }
    });
});

// Get all orders for product
vendorRoutes.route('/order/product/:id').get(function (req, res) {
    let id = req.params.id;
    Order.find({ "product": id }, function (err, order) {
        if (err) {
            console.log(err);
        } else {
            if (order != undefined) {
                res.json(order);
            }
            else {
                console.log(err);
            }
        }
    });
});

// delete order by id
vendorRoutes.delete('/order/:id', function (req, res) {
    Order.findByIdAndRemove(req.params.id, function (err, order) {
        if (err) return res.status(500).send("There was a problem deleting the order.");
        res.status(200).send("Order: " + order.name + " was deleted.");
    });
});

// review order by id
vendorRoutes.route('/order/review/:id').put((req, res) => {
    Order.findById(req.params.id, (err, order) => {
        console.log(req.body)
        if (err) {
            console.log(err);
        }
        else {
            order.review=req.body.review
            order.rating=req.body.rating
            order.save()
            res.json("SUCCESS")
        }
    })
})

// change the quantity of an order
vendorRoutes.route('/order/change_quantity/:id').put((req, res) => {
    Order.findById(req.params.id, (err, order) => {
        console.log(req.body)
        if (err) {
            console.log(err);
        }
        else {
            order.quantity=req.body.newQuantity
            order.save()
            res.json("SUCCESS")
        }
    })
})

module.exports = vendorRoutes;