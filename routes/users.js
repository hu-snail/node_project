const {responseClient} = require('../utils');
const User = require('../models/user')
const Config =  require('../config')

/** 登录 */
exports.login = (req, res) => {
    const { openid, nickName } = req.body;
    if (!openid) return responseClient(res, Config.HTTP._400, Config.RES_CODE.ERR, '用户openid不能为空')
    if (!nickName) return responseClient(res, Config.HTTP._400, Config.RES_CODE.ERR, '用户昵称不能为空')
    User.findOne({...req.body}, (err, result) => {
        if (err) {
            logger.error('Error:' + err)
            return responseClient(res)
        } else {
            if (result) {
                // 缓存用户信息
                req.session.userInfo = result
                responseClient(res, Config.HTTP._200, Config.RES_CODE.OK, '登录成功', result)
            } else responseClient(res, Config.HTTP._400, Config.RES_CODE.ERR, '用户名或者密码错误')
        }
    })
}

/** 用户信息 */
exports.userInfo = (req, res) => {
    if (req.session.userInfo) {
      responseClient(res, Config.HTTP._200, Config.RES_CODE.OK, '', req.session.userInfo)
    } else {
      responseClient(res, Config.HTTP._200, Config.RES_CODE.ERR, '请重新登录', req.session.userInfo)
    }
}

/** 登出 */

/** 根据用户id查询 */

/** 修改用户信息 */

/** 删除用户信息 */

/** 获取用户列表 */
exports.getUserList = (req, res) => {
    const params = req.query
    let keyword = params.keyword || ''
    let pageNum = parseInt(params.pageNum) || 1
    let pageSize = parseInt(params.pageSize) || 10
    let conditions = {}
    if (keyword) {
        // i 修饰符用于执行对大小写不敏感的匹配
        const reg = new RegExp(keyword, 'i')
        conditions = {
            $or: [
                {userName: {$regex: reg}},
                {phone: {$regex: reg}},
                {nickName: {$regex: reg}}
            ]
        }
    }
    // 分页
    let skip = pageNum - 1 < 0 ? 0 : (pageNum - 1) * pageSize
    // 返回数据结构
    let resData = {
        count: 0,
        list: []
    }
    User.countDocuments({}, (err, count) => {
        if (err) return logger.error('Error:' + err)
        // 返回总数
        resData.count = count
        let options = {
            skip: skip,
            limit: pageSize,
            sort: {createdTime: -1}
        }
        // 查询 conditions 查询条件 {} 返回参数 options 其他选项
        User.find(conditions, {}, options, (error, result) => {
            if (error) return console.log('find Error:' + error)
            resData.list = result
            req.session.userList = result
            responseClient(res, Config.HTTP._200, Config.RES_CODE.OK, 'sucess', resData)
        })
    })
}

/** 用户注册 */
exports.register = (req, res) => {
    // 获取前端的参数
    const params = req.body
    // 通过openid 或者 phone 验证
    const _findParams = {$or: [{'openid': params.openid}, {'phone': params.phone}]}
    // 查询该用户是否已经注册
    User.findOne(_findParams, (err, data) => {
        if (err) return responseClient(res, 0, 0, 'error', data)
        else {
            if (!data) {
                const user = new User({
                    ...params,
                })
                user.save(err => {
                    if (err) return responseClient(res, Config.HTTP._400, Config.RES_CODE.ERR, '数据库异常', err)
                    else responseClient(res, Config.HTTP._200, Config.RES_CODE.OK, '注册成功', data)
                })
            } else {
                responseClient(res, Config.HTTP._200, Config.RES_CODE.ERR, '该用户已注册')
            }
        }
    })
}
