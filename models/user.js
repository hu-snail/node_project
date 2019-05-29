var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  'id': String,
  'userName': String,
  'age': String,
  'sex': String
})

module.exports = mongoose.model('User', userSchema)