var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  'id': Number,
  'userName': String,
  'age': Number,
  'sex': String
})


module.exports = userSchema