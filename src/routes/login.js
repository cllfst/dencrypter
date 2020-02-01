var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/users');
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost/dencrypter';
const Schema = mongoose.Schema;

router.get('/', function (req, res) {
    res.sendFile(path.resolve("../src/public/html/login.html"));
});

router.post('/', (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    MongoClient.connect(url, async function (err, db) {
        console.log("connected");
        if (err) throw err;
        else {
            var dbo = db.db("users");
            dbo.collection("users").findOne({ "email": req.body.email }, function (err, result) {
                if (err) res.sendFile(path.resolve('../src/public/html/login.html'));
                else {
                    if (result && bcrypt.compare(req.body.password, result.password)) res.sendFile(path.resolve('../src/public/html/home.html'));
                    else res.sendFile(path.resolve('../src/public/html/login.html'));
                }
            });
        }
        db.close();
    })
})


module.exports = router;