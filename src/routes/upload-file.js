const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const fetch = require("node-fetch");

var RSA = require('hybrid-crypto-js').RSA;
var Crypt = require('hybrid-crypto-js').Crypt;
var crypt = new Crypt();
var rsa = new RSA({
    keySize: 2048, 
    rsaStandard: 'RSA-OAEP',
});

var express = require('express');
var router = express.Router();
//test for commit

router.get('/', (req, res) => {
    console.log("!..!");
    userName = 'Mark';
    res.render(path.join(__dirname, "../views/upload-file.ejs"), {
        user : userName,
    });
});
router.post("/upload", (req, res) => {
    //content transmission problem
    console.log("look what we got");
    var req = http.get();
    var num = req.body.value;
    console.log(num);
    res.render(path.join(__dirname, "../views/upload-file.ejs"));

});

router.post('/encrypt', (req, res) => {
    const fileName=req.body.fileName;
    rsa.generateKeyPair(function(keyPair) {
        // Callback function receives new key pair as a first argument
        var publicKey = keyPair.publicKey;
        var privateKey = keyPair.privateKey;
        
        data =  fs.readFileSync("../data/uploads/"+fileName, "binary"); 
        console.log("data : "+data);
        encrypted = crypt.encrypt(publicKey, data);

        //saving encrypted data
        fs.writeFileSync("../data/encrypted/"+fileName+"Encrypted", encrypted, 'binary');
        
        //saving keys
        fs.writeFileSync("../data/keys/"+fileName+"PublicKey.pem", publicKey);
        fs.writeFileSync("../data/keys/"+fileName+"PrivateKey.pem", privateKey);
    });


    res.render(path.join(__dirname, "../views/upload-file.ejs"));

});

router.post('/decrypt', (req, res) => {
    const fileName=req.body.fileName;
    // iff error??
    encrypted = fs.readFileSync("../data/encrypted/"+fileName+"Encrypted", "binary");
    console.log("" + encrypted)
    privateKey = fs.readFileSync("../data/keys/"+fileName+"PrivateKey.pem");
    decrypted = crypt.decrypt("" + privateKey, encrypted);
    console.log("decrypted : "+decrypted.message)
    fs.writeFileSync("../data/uploads/Decrypted"+fileName, decrypted.message, 'binary');

    res.render(path.resolve("../views/upload-file.ejs"));
});

module.exports = router;
