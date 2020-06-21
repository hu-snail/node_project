const {responseClient} = require('../utils');
const Catalog = require('../models/catalog')
const Article = require('../models/article')
const Config =  require('../config');
const { number } = require('yargs');
const logger = require('pomelo-logger').getLogger('mongodb-log')

/** 获取目录列表 */
exports.getCatalogList = (req, res) => {
    const params = req.query
    let keyword = params.keyword || ''
    let conditions = {}
    if (keyword) {
        // i 修饰符用于执行对大小写不敏感的匹配
        const reg = new RegExp(keyword, 'i')
        conditions = {
            $or: [
                {title: {$regex: reg}},
            ]
        }
    }
    // 返回数据结构
    let resData = {
        count: 0,
        list: []
    }
    // 统计总数据
    Catalog.countDocuments({}, (err, count) => {
        if (err) return logger.error('Error:' + err)
        // 返回总数
        resData.count = count
        let options = {
            sort: {createdTime: -1}
        }
        // 查询 conditions 查询条件 {} 返回参数 options 其他选项
        Catalog.find(conditions, {}, options, (error, result) => {
            if (error) return console.log('find Error:' + error)
            resData.list = result
            responseClient(res, Config.HTTP._200, Config.RES_CODE.OK, 'sucess', resData)
        })
    })
}

/** 新增目录  */
exports.catalogAdd = (req, res) => {
    // 获取前端的参数
    const params = req.body
    let catalog
    // 新增一级文件目录
    if (!params.id) {
        catalog = new Catalog({
            ...params,
        })
        save('', catalog, res)
    } else { // 新增文档目录
        Catalog.findOne({id: params.id}, function(err, item) {
            if (err) return responseClient(res, Config.HTTP._400, Config.RES_CODE.ERR, '新增异常', err)
            else {
                catalog = item
                const id = genID(10)
                const {title, pindex} = params
                catalog.children.unshift({id, title, pindex })
                save(id, catalog, res)
            }
        })
    }
}

const save = (id, catalog, res) => {
    catalog.save(err => {
        if (err) return responseClient(res, Config.HTTP._400, Config.RES_CODE.ERR, '新增异常', err)
        else responseClient(res, Config.HTTP._200, Config.RES_CODE.OK, '新增成功', id ? id: null)
    })
}

// 生成唯一id
const genID = (length) => {
    return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}

/** 修改一级目录名称 */
exports.catalogUpdateTitle = (req, res) => {
    const {_id, title} = req.body
    Catalog.update({_id}, {$set : {title}}, function(err, data) {
        if (err) return responseClient(res, Config.HTTP._400, Config.RES_CODE.ERR, '修改目录标题异常', err)
        else responseClient(res, Config.HTTP._200, Config.RES_CODE.OK, '修改目录标题成功', null)
    })
}

/** 修改二级目录名称 */
exports.subCatalogUpdateTitle = (req, res) => {
    const {_id, catalogId, title} = req.body
    Catalog.findById({_id}, function(err, catalog) {
        catalog.children.map(item => {
            if (catalogId === item.id) {
                item.title = title
                Catalog.update({_id}, {$set: {children: catalog.children}}, function(err, data) {
                    if (err) return responseClient(res, Config.HTTP._400, Config.RES_CODE.ERR, '修改二级目录标题异常', err)
                    else responseClient(res, Config.HTTP._200, Config.RES_CODE.OK, '修改二级目录标题成功', null)
                })
            }
        })
    })
}

/** 删除一级目录 */
exports.catalogDelete = (req, res) => {
    const {_id} = req.body
    Catalog.remove({_id}, function(err, data) {
        if (err) return responseClient(res, Config.HTTP._400, Config.RES_CODE.ERR, '删除目录标题异常', err)
        else responseClient(res, Config.HTTP._200, Config.RES_CODE.OK, '删除目录标题成功', null)
    })
}

/**
 * 删除二级目录 & 删除关联文档
 * 
 * */
exports.subcatalogDelete = (req, res) => {
    const {_id, catalogId } = req.body
    Catalog.findById({_id}, function(err, catalog) {
        catalog.children.map((item, index) => {
            if (catalogId === item.id) {
                catalog.children.splice(index, 1)
                Article.remove({catalogId}, function(err, data) {
                    console.log('删除成功')
                })
                Catalog.update({_id}, {$set: {children: catalog.children}}, function(err, data) {
                    if (err) return responseClient(res, Config.HTTP._400, Config.RES_CODE.ERR, '删除二级目录标题异常', err)
                    else responseClient(res, Config.HTTP._200, Config.RES_CODE.OK, '删除二级目录标题成功', null)
                })
            }
        })
    })
}

