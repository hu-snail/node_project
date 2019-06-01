/**
 * user modules
 * @file 用户数据模型
 * @author hujiangjun<https://github.com/hu-snail>
 */

// const crypto = require('crypto');
// const { argv } = require('yargs');
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');

const userSchema = new mongoose.Schema({
    // 用户名
    'userName': {type: String, default: ''},
    // 用户昵称
    'nickName': {type: String, required: true, default: ''},
    // 用户密码
    'password': {type: String, default: ''},
    // 用户类型 0 普通用户 1 博主
    'userType': {type: Number, default: 0},
    // 用户手机
    'phone': {type: String, default: ''},
    // 用户头像
    'avatarUrl': {type: String, default: ''},
    // 微信openid
    'openid': {type: String, required: true, default: ''},
    // 用户性别
    'gender': {type: String, default: '0'},
    // 用户年龄
    'age': {type: Number, default: 18},
    // 用户所在城市
    'city': {type: String, default: '北京'},
    // 用户所在省份
    'province': {type: String, default: '北京'},
    // 用户所在国家
    'country': {type: String, default: '中国'},
    // 用户描述
    'desc': {type: String, default: ''},
    // 用户院校
    'school': {type: String, default: ''},
    // 用户登录时间
    'loginTime': {type: Date, default: Date.now},
    // 创建时间
    'createdTime': {type: Date, default: Date.now},
    // 修改时间
    'createdTime': {type: Date, default: Date.now},
})
// 自增 ID 插件配置
userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'id',
    startAt: 1,
    incrementBy: 1,
});
module.exports = mongoose.model('User', userSchema)

