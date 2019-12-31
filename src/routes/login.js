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
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    ////connect to BD
    mongoose.connect(url, async function(err, db) {
        console.log("connected");
        if (err) throw err;
        var reponse = await db.collection("user").countDocuments({ $and: [{ "email": req.body.email, "password": req.body.password }] });
        var reponse2 = await db.collection("user").countDocuments({ "email": req.body.email });

        if (reponse == 1) {
            console.log("we found you");
            //go to bouri's house
            //res.sendFile(path.resolve('../src/public/bouri.html'));
            res.send(200, 'mar7ba');
            return;
        }
        if (reponse2 == 1) {
            console.log("is that you ?");
            res.send(401, 'try again');
            return;
        } else {
            res.send(500, 'you may go to sing_up ;)');
            //go to abaybar's house 
            //res.sendFile(path.resolve("../src/public/sign.html"));
            return;
        }
        db.close();
    });
});

module.exports = router;