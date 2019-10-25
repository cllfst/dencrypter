const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const exec = require('child_process').exec;




app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded());
app.get('/home',(req,res) => {
    res.render(path.resolve("../views/upload-file.ejs"));
});
app.post('/upload',(req,res) => {
    console.log(`hi`);
    console.log(`${req.body}`);
    //fs.writeFileSync(`./uploads/hi`,req.body.file);
    res.render(path.resolve("../views/upload-file.ejs"));
});

app.post('/encrypt',(req,res) => {
    const myShellScript = exec('sh bash.sh ./');
    res.render(path.resolve("../views/upload-file.ejs"));
});
const port = process.env.PORT || 4000 ;

app.listen(port, () => console.log(`listening on port ${port} `));
