const user = require('./users')
const catalog = require('./catalog')
const article = require('./article')

module.exports = app => {
    app.get('/getUserList', user.getUserList)
    app.get('/userInfo', user.userInfo)
    app.post('/login', user.login)
    app.post('/register', user.register)
    app.get('/getCatalogList', catalog.getCatalogList)
    app.post('/catalogAdd', catalog.catalogAdd),
    app.post('/catalogUpdateTitle', catalog.catalogUpdateTitle),
    app.post('/subCatalogUpdateTitle', catalog.subCatalogUpdateTitle),
    app.post('/catalogDelete', catalog.catalogDelete),
    app.post('/subcatalogDelete', catalog.subcatalogDelete),
    app.get('/getArticle', article.getArticle),
    app.post('/articleAdd', article.articleAdd)
    app.get('/searchArticles', article.searchArticles)
}