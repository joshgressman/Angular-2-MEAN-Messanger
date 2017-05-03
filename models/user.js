var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
//Schema constructor
var schema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  messages: [{type: Schema.Types.ObjectId, ref:'Message'}] //ref connects to another collection / messages from message schema
});

schema.plugin(mongooseUniqueValidator);
//will export the model and create the collection in mongoose
module.exports = mongoose.model('User', schema);
