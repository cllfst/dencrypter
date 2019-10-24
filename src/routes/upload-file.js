const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded());
app.get('/home',(req,res) => {
    res.render(path.resolve("../views/upload-file.ejs"));
});
const port = process.env.PORT || 8000 ;

app.listen(port, () => console.log(`listening on port ${port} `));
