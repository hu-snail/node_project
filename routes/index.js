const user = require('./users')

module.exports = app => {
    app.get('/getUserList', user.getUserList)
    app.get('/userInfo', user.userInfo)
    app.post('/login', user.login)
    app.post('/register', user.register)
}