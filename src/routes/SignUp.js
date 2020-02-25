var express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const User = require('../models/users');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
require('dotenv/config');


router.get('/', (req, res, next) => {
    res.sendFile(path.resolve('../src/public/html/SignUp.html'));

});

router.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );


router.post('/', (req, res) => {
    var answer;
    // MongoClient.connect(url, function (err, client) {
    //     var db = client.db("users");
    //     db.collection('users').find({ username: req.body.username }).toArray(async function (err, result) {
    //         if (result.length > 0)
    //             //res.sendFile(path.resolve('../src/public/html/signUperror.html'));
    //             res.json(answer);

    //         else {
    //             const saltRounds = 10;
    //             const plainPassword = req.body.password;
    //             const salt = await bcrypt.genSalt(saltRounds);
    //             const hash = await bcrypt.hash(plainPassword, salt);
    //             const user = new User({
    //                 name: req.body.name,
    //                 lastName: req.body.lastName,
    //                 username: req.body.username,
    //                 email: req.body.email,
    //                 password: hash
    //             });
    //             db.collection("cususerstomers").insertOne(user, function(err, res) {
    //                 if (err) throw err;
    //                 console.log("1 user inserted");
    //                 db.close();
    //             });
    //             await res.json(answer);
    //         }
    //         client.close();

    //     });
    // });
    console.log(req.body.name);
    console.log('hey');

});


module.exports = router;
