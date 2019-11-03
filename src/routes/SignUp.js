var express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const User = require('../models/users');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
require('dotenv/config');


router.get('/',(req,res,next) => {
    res.sendFile(path.resolve('../src/public/SignUp.html'));
    
});

router.post('/', async (req,res) => {   
    
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
        });
        const users = await User.find();
    
        if( verifyUserByUsername(users,req.body.username) && verifyUserByEmail(users,req.body.email) ) {
            user.save()
            
            res.sendFile(path.resolve('../src/public/home.html'));

        }
        else {
            
            res.send(500,'username/email exists') 
        }

   
          console.log('no return');                           
          
      });

router.post('/checkusers', async (req,res) => {
        const users = await User.find();
        res.json(users);

    } )


mongoose.connect('mongodb://localhost/users', function(err) {
  if (err) { throw err; }
  console.log("connected to DB!!");
});

//My functions

function verifyUserByUsername(users,username) {
    var i;
    for(i=0; i<users.length; i++) {
        if(users[i].username == username) return false ;
    }
    return true;

}

function verifyUserByEmail(users,email) {
    var i;
    for(i=0; i<users.length; i++) {
        if(users[i].email == email) return false ;
    }
    return true;

}


module.exports = router;
