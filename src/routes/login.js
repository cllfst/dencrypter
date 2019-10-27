var express = require('express');
var router = express.Router();
var path = require('path');
var MongoDencrypter = require('mongodb').MongoClient;
var url = 'mongodb://localhost/DencrypterDB';

router.get('/', function(req, res) {
    res.sendFile(path.resolve("../src/public/login.html"));
});

MongoDencrypter.connect(url, function(err, db) {
    console.log("connected");
    db.close();
});

router.get('/welcome', function(req, res) {
    res.sendfile('welcome.html');
});

module.exports = router;