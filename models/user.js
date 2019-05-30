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
    'id': {type: Number, default: 0},
    'userName': {type: String, default: ''},
    'age': {type: Number, default: 0},
    'sex': {type: String, default: ''}
})
// 自增 ID 插件配置
userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'id',
    startAt: 1,
    incrementBy: 1,
});
module.exports = mongoose.model('User', userSchema)

