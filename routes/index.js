const user = require('./users')
const catalog = require('./catalog')
module.exports = app => {
    app.get('/getUserList', user.getUserList)
    app.get('/userInfo', user.userInfo)
    app.post('/login', user.login)
    app.post('/register', user.register)
    app.get('/getCatalogList', catalog.getCatalogList)
    app.post('/catalogAdd', catalog.catalogAdd)
}