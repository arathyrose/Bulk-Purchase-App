var express = require('express');
let Product = require("../models/product")
const vendorRoutes = express.Router()

// Get the details of all products
vendorRoutes.route('/product/showall').get(function (req, res) {
    Product.find(function (err, products) {
        if (err) {
            console.log(err)
        } else {
            res.json(products)
        }
    })
})

// Get all the products in the waiting state
vendorRoutes.route('/product/showallwaiting').get(function (req, res) {
    Product.find({ status: "Waiting" }, function (err, products) {
        if (err) {
            console.log(err)
        } else {
            res.json(products)
        }
    })
})

// Get the list of product IDs with their names and statuses
vendorRoutes.route('/product/getnames').get(function (req, res) {
    Product.find({}, { name: 1, status: 1 }, function (err, products) {
        if (err) {
            console.log(err)
        } else {
            res.json(products)
        }
    })
})

// Add a new product
vendorRoutes.route('/product/add').post(function (req, res) {
    let product = new Product(req.body)
    product
        .save()
        .then(product => { res.status(200).json({ 'Status': 'Successful' }) })
        .catch(err => { res.status(400).json({ 'Status': "Error" }) })
})

// Get a product by id
vendorRoutes.route('/product/:id').get(function (req, res) {
    let id = req.params.id
    Product.findById(id, function (err, product) {
        res.json(product)
    })
})

// get product name by id
vendorRoutes.route('/product/name/:id').get(function (req, res) {
    let id = req.params.id
    Product.findById(id, function (err, product) {
        res.json(product.name)
    })
})

// get product status by id
vendorRoutes.route('/product/status/:id').get(function (req, res) {
    let id = req.params.id
    Product.findById(id, function (err, product) {
        res.json(product.status)
    })
})

// Get all product details by name
vendorRoutes.route('/product/name/:name').get(function (req, res) {
    let name = req.params.name
    console.log(name)
    if (name != "") {
        Product.find({ "name": name }, function (err, product) {
            if (err) {
                console.log(err)
            } else {
                if (product != undefined) {
                    res.json(product)
                }
                else {
                    console.log(err)
                }
            }
        })
    }
    else {
        Product.find(function (err, products) {
            if (err) {
                console.log(err)
            } else {
                res.json(products)
            }
        })
    }
})

// Get all products by vendor
vendorRoutes.route('/product/vendor/:id').get(function (req, res) {
    let id = req.params.id
    Product.find({ "vendor": id }, function (err, product) {
        if (err) {
            console.log(err)
        } else {
            if (product != undefined) {
                res.json(product)
            }
            else {
                console.log(err)
            }
        }
    })
})

// remove the order_value from quantity remaining 
vendorRoutes.route('/product/order_decrement/:id').put((req, res) => {
    Product.findById(req.params.id, (err, product) => {
        console.log(product.quantity_remaining)
        console.log(req.body.order_value)
        if (err) {
            console.log(err)
        }
        else {
            product.quantity_remaining = product.quantity_remaining - req.body.order_value
            if (product.quantity_remaining == 0) {
                product.status = "Placed"
            }
            product.save()
            res.json("SUCCESS")
        }
    })
})

// change the status of the given product to req.body.status
vendorRoutes.route('/product/change_status/:id').put((req, res) => {
    Product.findById(req.params.id, (err, product) => {
        console.log(req)
        if (err) {
            console.log(err)
        }
        else {
            product.status = req.body.status
            product.save()
            res.json("SUCCESS")
        }
    })
})

// reset the quantity remaining 
vendorRoutes.route('/product/reset_quantity/:id').put((req, res) => {
    Product.findById(req.params.id, (err, product) => {
        console.log(req)
        if (err) {
            console.log(err)
        }
        else {
            product.quantity_remaining = product.total_quantity
            product.save()
            res.json("SUCCESS")
        }
    })
})

// delete a product by id
vendorRoutes.delete('/product/:id', function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err, product) {
        if (err) {
            res.status(500).send("There was a problem deleting the product.")
        }
        else {
            res.status(200).send("Product: " + product.name + " was deleted.")
        }
    })
})

module.exports = vendorRoutes;