var express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/users');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
require('dotenv/config');


router.get('/', (req, res, next) => {
    res.sendFile(path.resolve('../src/public/html/SignUp.html'));

});

router.post('/', (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: 'hash'
    });
    MongoClient.connect(url, function (err, client) {
        var db = client.db("users");
        var ha = "password";
        db.collection('users').find({ username: req.body.username }).toArray(async function (err, result) {
            if (result.length > 0)
                res.sendFile(path.resolve('../src/public/html/signUperror.html'));

            else {
                // const saltRounds = 10;
                // const plainPassword = req.body.password;
                // const salt = await bcrypt.genSalt(saltRounds);
                // const hash = await bcrypt.hash(plainPassword, salt);
                
                console.log(user);
                user.save();
                await res.sendFile(path.resolve('../src/public/html/home.html'));
            }
            client.close();

        });
    });

});


module.exports = router;
