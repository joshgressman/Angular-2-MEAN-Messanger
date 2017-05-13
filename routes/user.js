var express = require('express');
var router = express.Router();
var User = require('../models/user'); //imports the user model / Schema
var bcrypt = require('bcryptjs');

router.post('/', function (req, res, next) {
  var user = new User({
     firstName: req.body.firstName,
     lastName:  req.body.lastName,
     password:  bcrypt.hashSync(req.body.password, 10), //hashes the password
     email:     req.body.emial
  });
   user.save(function(err, result){
     if(err){
       return res.status(500).json({
         title: 'An error occured',
         error: err
       });
     }
     res.status(201).json({
       message: 'User Created',
       obj: result
     });
   });
});




module.exports = router;
