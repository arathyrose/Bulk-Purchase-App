var express = require('express');
let User = require('../models/user');
const userRoutes = express.Router();

// Get all users
userRoutes.route('/user/showall').get(function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

//Get all vendors
userRoutes.route('/vendor/showall').get(function (req, res) {
    User.find({ "type": "Vendor" }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

// Get the names and IDs of all users
userRoutes.route('/user/getnames').get(function (req, res) {
    User.find({}, { username: 1 }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

// Add a new user
userRoutes.route('/user/register').post(function (req, res) {
    let user = new User(req.body);
    console.log(user)
    user
        .save()
        .then(user => { res.status(200).json({ 'Status': 'Successful' }) })
        .catch(err => { res.status(400).json({ 'Status': err }); console.log(err) });
});

// get username by id
userRoutes.route('/user/name/:id').get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        res.json(user.username);
    });
});

// Get a user by id
userRoutes.route('/user/:id').get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        if (err) {
            res.json("")
        } else {
            res.json(user);
        }
    });
});

// login given username and password
userRoutes.route('/user/login').post(function (req, res) {
    let name = req.body.username
    let pass = req.body.password
    console.log("name", name)
    User.find({ "username": name, "password": pass }, function (err, users) {
        if (users != undefined) {
            if (err) {
                res.status(200).json(0)
            } else {
                let current_user = users[0]
                if (current_user != undefined) {
                    res.status(200).json(current_user._id);
                }
                else {
                    res.status(200).json(0)
                }
            }
        }
        else {
            res.status(200).json(0)
        }
    });
});

// get the user type given id
userRoutes.route('/user/get_type/:id').get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        if (err) {
            res.json("")
        } else {
            res.json(user.type);
        }
    });

});

module.exports = userRoutes;