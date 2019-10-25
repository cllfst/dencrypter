const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const formidable = require('formidable');
const exec = require('child_process').exec;
const WebCrypto = require("node-webcrypto-ossl");
var webcrypto = new WebCrypto({
    directory: "keys"
  });
var keyStorage = webcrypto.keyStorage;





app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded());
app.get('/home',(req,res) => {
    res.render(path.resolve("../views/upload-file.ejs"));
});
app.post('/upload',(req,res) => {
    console.log(`hi`);
    new formidable.IncomingForm().parse(req)
    .on('fileBegin', (name, file) => {
        file.path = '../data/uploads/' + file.name
    })
    .on('file', (name, file) => {
      console.log('Uploaded file', name, file)
    })
    res.render(path.resolve("../views/upload-file.ejs"));
});

app.post('/encrypt',(req,res) => {
    const fileName=req.body.fileName;
    webcrypto.subtle.generateKey({
        name: "RSASSA-PKCS1-v1_5",
        modulusLength: 1024,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: {
          name: "SHA-1"
        }
      },
        false,
        ["sign", "verify"]
      )
      .then(function(keyPairs){
        keyStorage.setItem(fileName+"PublicKey", keyPairs.publicKey);
        keyStorage.setItem(fileName+"PrivateKey", keyPairs.privateKey);
      })
    res.render(path.resolve("../views/upload-file.ejs"));
});

app.post('/decrypt',(req,res) => {
    const fileName=req.body.fileName;
    keyStorage.getItem(fileName+"PrivateKey");
    res.render(path.resolve("../views/upload-file.ejs"));
});
const port = process.env.PORT || 4000 ;

app.listen(port, () => console.log(`listening on port ${port} `));
