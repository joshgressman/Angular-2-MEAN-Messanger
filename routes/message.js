
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user'); //imports the user model / Schema

//communicates with the messages Scheme
var Message = require('../models/message');

router.get('/', function(req,res, next){
  Message.find()
   .populate('user', 'firstName') //gets the user info from the user Scheme
   .exec(function(err, messages){
     if(err){
       return res.status(500).json({
         title: 'An error occured',
         error: err
       });
     }
     res.status(200).json({
        message: 'Success',
        obj: messages
     });
   });
});

//Route protection for logged in users - check for a valid token using secret from user.js
router.use('/', function(req, res, next){
    jwt.verify(req.query.token, 'secret', function(err, decoded) {
       if(err){
         return res.status(401).json({
           title: "Not Authenticated User",
           error: err
         });
       }
       next();
    });
});

router.post('/', function (req, res, next) {
      var decoded = jwt.decode(req.query.token); //provides decoded token that contains user info
      User.findById(decoded.user._id, function(err, user){
        if(err){
          return res.status(500).json({
            title: 'An error occured',
            error: err
          });
        }
        var message = new Message({
          content: req.body.content,
          user: user //adds user to message
        });
        message.save(function(err, result){
          if(err){
            return res.status(500).json({
              title: 'An error occured',
              error: err
            });
          }
          user.messages.push(result); //pushes message to user Array
          user.save();
          console.log('result', result);
          res.status(201).json({
            message: 'Saved Message',
            obj: result
          });
        }); //saves to mongo
      });
});

//change exhisting data with patch
router.patch('/:id', function(req, res, next){
  var decoded = jwt.decode(req.query.token); //checks token
  Message.findById(req.params.id, function(err,message){
      if(err){
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      if(!message){
        return res.status(500).json({
          title: 'No message found',
          error: {message: 'Message not found'}
        });
      }
      if(message.user != decoded.user._id){
          return res.status(401).json({
            title: "Not Authenticated User",
            error: {message: 'users do not match'}
          });
      }
      message.content = req.body.content;
      message.save(function(err, result){
        if(err){
          return res.status(500).json({
            title: 'An error occured',
            error: err
          });
        }
        console.log('result', result);
        res.status(200).json({
          message: 'Updated Message',
          obj: result
        });
      });
  });
});

router.delete('/:id', function(req, res, next){
  var decoded = jwt.decode(req.query.token);
  Message.findById(req.params.id, function(err,message){
      if(err){
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      if(!message){
        return res.status(500).json({
          title: 'No message found',
          error: {message: 'Message not found'}
        });
      }
      if(message.user != decoded.user._id){
          return res.status(401).json({
            title: "Not Authenticated User",
            error: {message: 'users do not match'}
          });
      }
      message.remove(function(err, result){
        if(err){
          return res.status(500).json({
            title: 'An error occured',
            error: err
          });
        }
        console.log('result', result);
        res.status(200).json({
          message: 'Updated Deleted',
          obj: result
        });
      });
  });
});


module.exports = router;
