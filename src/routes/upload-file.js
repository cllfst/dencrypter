const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const formidable = require('formidable');
var RSA = require('hybrid-crypto-js').RSA;
var Crypt = require('hybrid-crypto-js').Crypt;
var crypt = new Crypt();
var rsa = new RSA({
    keySize: 2048, 
    rsaStandard: 'RSA-OAEP',
});

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded());

app.set('view engine', 'ejs');



app.get('/home', (req, res) => {
    userName = 'Mark';
    res.render(path.join(__dirname, "../views/upload-file.ejs"), {
        user : userName,
    });
});
app.post('/upload', (req, res) => {
    console.log(`hi`);
    new formidable.IncomingForm().parse(req)
    .on('fileBegin', (name, file) => {
        file.path = path.join(__dirname, '../data/uploads/' + file.name)
    })
    .on('file', (name, file) => {
      console.log('Uploaded file', name, file)
    })
    res.render(path.join(__dirname, "../views/upload-file.ejs"));
});

app.post('/encrypt', (req, res) => {
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

app.post('/decrypt', (req, res) => {
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
const port = process.env.PORT || 3000 ;

app.listen(port, () => console.log(`listening on port ${port} `));
