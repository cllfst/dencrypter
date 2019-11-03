var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var User = require('../schema_BD/schema_mongodb');
var MongoDencrypter = require('mongodb').MongoClient;
var url = 'mongodb://localhost/users';
const Schema = mongoose.Schema;


////send html file
router.get('/', function(req, res) {
    res.sendFile(path.resolve("../src/public/login.html"));
});


router.post('/', async(req, res) => {

    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
    const users = await User.find();

    if (verifyUserExist(users, req.body.email, req.body.password)) {
        //go to bouri's house
        //res.sendFile(path.resolve('../src/public/bouri.html'));
        res.send(500, 'mar7ba')
    }

    if (verifyUserByPassword(users, req.body.email, req.body.password)) {
        res.send(500, 'please verify your password');
    } else {
        res.send(500, 'you may go to sing_up ;)')
            //go to abaybar's house 
    }
});


//connect to BD

//MongoDencrypter.connect(url, function(err, db) {
mongoose.connect(url, function(err, db) {
    console.log("connected");
    if (err) { throw err; }
    console.log("connected to DB!!");
    //db.close();
});

//mongoose.connection.close();

////My functions
function verifyUserExist(users, email, password) {
    var i;
    for (i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password) return true;
    }
    return false;
}

function verifyUserByPassword(users, email, password) {
    var i;
    for (i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password != password) return true;
    }
    return false;
}

module.exports = router;