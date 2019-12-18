var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var User = require('../schema_BD/schema_mongodb');
var MongoDencrypter = require('mongodb').MongoClient;
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
    mongoose.connect(url, function(err, db) {
        console.log("connected");
        if (err) throw err;
        //var dbo = db.db("dencrypter");

        if (db.collection("user").find({ "email": req.body.email, "password": req.body.password }).count() == 1) {
            console.log("we found you");
            //go to bouri's house
            //res.sendFile(path.resolve('../src/public/bouri.html'));
            res.send(200, 'mar7ba');
            return
        }

        if (db.collection("user").find({ "email": req.body.email }).count()) {
            console.log("is that you ?");
            res.send(401, 'try again');
            return
        } else {
            res.send(500, 'you may go to sing_up ;)');
            //go to abaybar's house 
        }
        db.close();
    });

});

module.exports = router;