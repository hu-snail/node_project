const {responseClient} = require('../utils');
const Catalog = require('../models/catalog')
const Config =  require('../config');
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
        save(catalog, res)
    } else { // 新增文档目录
        Catalog.findOne({id: params.id}, function(err, item) {
            if (err) return responseClient(res, Config.HTTP._400, Config.RES_CODE.ERR, '新增异常', err)
            else {
                catalog = item
                const id = genID(10)
                catalog.children.unshift({id, title: params.title})
                save(catalog, res)
            }
        })
    }
}

const save = (catalog, res) => {
    catalog.save(err => {
        if (err) return responseClient(res, Config.HTTP._400, Config.RES_CODE.ERR, '新增异常', err)
        else responseClient(res, Config.HTTP._200, Config.RES_CODE.OK, '新增成功', null)
    })
}

// 生成唯一id
const genID = (length) => {
    return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}