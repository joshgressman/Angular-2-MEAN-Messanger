var express = require('express');
var router = express.Router();
// var User = require('../models/user'); imports the user model / Schema


router.get('/', function (req, res, next) {
        res.render('index');
});


// router.get('/', function (req, res, next) {
//     User.findOne({}, function(err, doc){
//       if(err){
//         return res.send('Error');
//       }
//         res.render('node', {object: doc}); //doc is the data from the DB object is type doc both doc and object can have different names of choice
//     });
// });

// router.post('/', function(req, res, next){
//   var email = req.body.email;
//   var user = new User({  //user model going to DB
//     firstName: 'Josh',
//     lastName: 'Gressman',
//     password: 'password',
//     email: email
//   });
//   user.save(); //sends the user data to the DB - creates a collection
//   res.redirect('/'); //re-directs to the get /message route
// });

module.exports = router;
