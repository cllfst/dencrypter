var express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const User = require('../models/users');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

require('dotenv/config');


router.get('/', (req, res, next) => {
    res.sendFile(path.resolve('../src/public/SignUp.html'));

});

router.post('/', (req, res) => {

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    message = false;

    MongoClient.connect(url, function (err, client) {
        var db = client.db("users");

        db.collection('users').find({ username: req.body.username }).toArray(function (err, result) {
            if (result.length > 0)
                res.sendFile(path.resolve('../src/public/signUperror.html'));

            else {
                user.save()
                res.sendFile(path.resolve('../src/public/home.html'));
            }
            client.close();

        });
    });

});


router.post('/checkusers', async (req, res) => {
    const users = await User.find();
    res.json(users);

})