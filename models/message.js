var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

//Schema constructor
var schema = new Schema({
  content: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User'} //ref user will point to User Schema
});

//Middleware function that listens for 'remove' and pulls the message from the user message array
schema.post('remove', function(message){
  console.log('message', message);
  User.findById(message.user, function (err, user){
     user.messages.pull(message);
     user.save();
  });
});

//will export the model and create the collection in mongoose with Message
module.exports = mongoose.model('Message', schema);
