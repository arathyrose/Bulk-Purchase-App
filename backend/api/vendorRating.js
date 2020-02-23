var express = require('express')
const rateRoutes = express.Router()
const Rating = require('../models/vendorRatings')

// Get all the ratings
rateRoutes.route('/rating/showall').get(function (req, res) {
    Rating.find(function (err, ratings) {
        if (err) {
            console.log(err)
        }
        else {
            res.json(ratings)
        }
    })
})

// Add a new rating
rateRoutes.route('/rating/add').post(function (req, res) {
    let rating = new Rating(req.body)
    rating
        .save()
        .then(rating => { res.status(200).json({ 'Status': 'Successful' }) })
        .catch(err => { res.status(400).json({ 'Status': err }) })
})

// change a rating
rateRoutes.route('/rating/add').put(function (req, res) {
    Rating.find({ "vendor": req.body.vendor,"customer":req.body.customer }, function (err, rating) {
        if (err) {
            console.log(err);
        }
        else {
            rating[0].rating=req.body.rating
            rating[0].review=req.body.review
            rating[0].save()
            res.json("SUCCESS")
        }
    })
})

// Get a rating by id
rateRoutes.route('/rating/:id').get(function (req, res) {
    let id = req.params.id
    Rating.findById(id, function (err, rating) {
        if (err) {
            res.json("")
        }
        else {
            res.json(rating)
        }
    })
})

// Get all ratings of a vendor
rateRoutes.route('/rating/vendor/:id').get(function (req, res) {
    let id = req.params.id
    Rating.find({ "vendor": id }, function (err, rating) {
        if (err) {
            console.log(err)
        }
        else {
            if (rating != undefined) {
                res.json(rating)
            }
            else {
                console.log(err)
            }
        }
    })
})

// Get all ratings of a customer
rateRoutes.route('/rating/customer/:id').get(function (req, res) {
    let id = req.params.id
    Rating.find({ "customer": id }, function (err, rating) {
        if (err) {
            console.log(err)
        }
        else {
            //let current_user = users[0]
            if (rating != undefined) {
                res.json(rating)
            }
            else {
                console.log(err)
            }
        }
    })
})

// view the rating of the customer
rateRoutes.route('/rating/view').post(function (req, res) {
    Rating.find({ "customer": req.body.customer, "vendor": req.body.vendor }, function (err, rating) {
        if (err) {
            console.log(err)
        }
        else {
            if (rating != undefined) {
                res.json(rating)
            }
            else {
                console.log(err)
            }
        }
    })
})

// get the average rating of a vendor
rateRoutes.route('/vendor/rating/:id').get(function (req, res) {
    let id = req.params.id
    Rating.find({ "vendor": id }, function (err, rating) {
        if (err) {
            console.log(err)
        }
        else {
            if (rating != undefined) {
                console.log(rating)
                var sum = 0
                for (var i = 0; i < rating.length; i++) {
                    sum += rating[i].rating
                    console.log(sum)
                }
                var k = sum / rating.length
                res.json(k)
                console.log(k)
            }
            else {
                console.log(err)
            }
        }
    })
})

// get the average rating of all the users
rateRoutes.route('/avg_rating').get(function (req, res) {
    Rating.aggregate([{ $group: { _id: "$vendor", avgRating: { $avg: "$rating" } } }], function (err, vendors) {
        if (err) {
            console.log(err)
        }
        else {
            if (vendors != undefined) {
                res.json(vendors)
            }
            else {
                console.log(err)
            }
        }
    })
})

module.exports = rateRoutes;