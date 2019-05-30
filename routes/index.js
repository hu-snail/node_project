const user = require('./users')
module.exports = app => {
    app.get('/users', user.getUserList);
}