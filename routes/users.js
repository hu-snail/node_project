var express = require('express');
var router = express.Router();

var mongoose = require('mongoose')
var User = require('../models/user')
// 链接数据库
mongoose.connect('mongodb://127.0.0.1:27017/test')

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected success.')
})

mongoose.connection.on('error', () => {
console.log('MongoDB connected fail.')
})

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connected disconnected.')
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  let userModel = User.find()
  console.log(userModel)
  userModel.exec((err, doc) => {
    console.log(err)
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
});

module.exports = router;
