
var express = require('express');
var router = express.Router();
// var User = require('../models/user'); imports the user model / Schema

//communicates with the messages Scheme
var Message = require('../models/message');

router.get('/', function(req,res, next){
  Message.find()
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

router.post('/', function (req, res, next) {
  console.log('anything', req.body);
      var message = new Message({
        content: req.body.content
      });
      message.save(function(err, result){
        if(err){
          return res.status(500).json({
            title: 'An error occured',
            error: err
          });
        }
        console.log('result', result);
        res.status(201).json({
          message: 'Saved Message',
          obj: result
        });
      }); //saves to mongo
});




module.exports = router;
