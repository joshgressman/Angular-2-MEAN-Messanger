var express = require('express');
var router = express.Router(); //imports the user model / Schema
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

//sign up route
router.post('/', function (req, res, next) {

  var user = new User({
     firstName: req.body.firstName,
     lastName:  req.body.lastName,
     password:  bcrypt.hashSync(req.body.password, 10), //hashes the password
     email:     req.body.email
  });
  console.log('user', user);
   user.save(function(err, result){
     if(err){
       return res.status(500).json({
         title: 'An error occured while saving',
         error: err
       });
     }
     res.status(201).json({
       message: 'User Created',
       obj: result
     });
   });
});


//sign in routes checks for user
//Token will be created for authenication
router.post('/signin', function(req, res, next){
  User.findOne({email: req.body.email}, function(err, user){ //uses the User model / Scheema to query
    if(err){
      return res.status(500).json({
        title: 'An error occured while finding one by email',
        error: err
      });
    }
    if(!user) {
      return res.status(401).json({
        title: 'Login Failed!',
        error: {message: 'Invalid login credentials'}

      });
    }
      if (!bcrypt.compareSync(req.body.password, user.password)){ //compares the hashed password
        return res.status(401).json({
          title: 'Login Failed!',
          error: {message: 'Invalid login credentials'}
        });
      }
      //Creates a new web token stores the user object that is retreived
       var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200}); //expiresIn sets the session token time
       res.status(200).json({
         message: 'Successfully logged in',
         token: token,
         userId: user._id
       });
  });
});



module.exports = router;
