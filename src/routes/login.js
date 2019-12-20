var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
const User = require('../models/users');
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost/dencrypter';
const Schema = mongoose.Schema;

////send html file
router.get('/', function(req, res) {
    res.sendFile(path.resolve("../src/public/login.html"));
});

router.post('/', (req, res) => {
    //console.log(req);
    //console.log(req.body);
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
    //const users = await user.find({"email": req.body.email, "password": req.body.password});

    ////connect to BD
    MongoClient.connect(url, function(err, db) {
        console.log("connected");
        if (err) throw err;
        var dbo = db.db("users");
        dbo.collection("users").find({$and: [{ "email": req.body.email, "password": req.body.password }]}).toArray(function(err,data){
            
                if (data.length==1){
                    res.sendFile(path.resolve('../src/public/home.html'));
                }
                else res.sendFile(path.resolve('../src/public/login.html'));

        })

        
        db.close();
    });

});

module.exports = router;