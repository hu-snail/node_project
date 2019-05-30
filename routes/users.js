const {responseClient} = require('../utils');
const DB = require('../config/request')
const User = require('../models/user')

exports.getUserList = (req, res) => {
    DB.find(User,(err, data) => {
        responseClient(res, 200, 0, 'success', data)
    })
}
