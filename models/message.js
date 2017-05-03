var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema constructor
var schema = new Schema({
  content: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User'} //ref user will point to User Schema
});

//will export the model and create the collection in mongoose with Message
module.exports = mongoose.model('Message', schema);
