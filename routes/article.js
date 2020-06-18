const {responseClient} = require('../utils');
const Article = require('../models/article')
const Config =  require('../config');

exports.getArticle = (req, res) => {
    const catalogId = req.query.catalogId
    Article.findOne({catalogId}, (err, result) => {
        if (err) return responseClient(res, Config.HTTP._400, Config.RES_CODE.ERR, '查询文章异常', err)
        responseClient(res, Config.HTTP._200, Config.RES_CODE.OK, 'sucess', result || {})
    })
}

exports.articleAdd = (req, res) => {
    const params = req.body
    if (!params._id) {
        const article = new Article({
            ...params
        })
        save(article, res)
    } else {
        // 第二次保存
        Article.findOne({_id: params._id}, function(err, item) {
            if (err) return responseClient(res, Config.HTTP._400, Config.RES_CODE.ERR, '新增异常', err)
            else {
                const article = item
                // 更新数据
                article.content = params.content
                article.renderContent = params.renderContent
                save(article, res)
            }
        })
    }
}

const save = (article, res) => {
    article.save(err => {
        if (err) return responseClient(res, Config.HTTP._400, Config.RES_CODE.ERR, '新增异常', err)
        else responseClient(res, Config.HTTP._200, Config.RES_CODE.OK, '新增成功', null)
    })
}