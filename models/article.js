/**
 * article modules
 * @file 用户数据模型
 * @author hujiangjun<https://github.com/hu-snail>
 */

const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');
const { number } = require('yargs');

const articleSchema = new mongoose.Schema({
    title: String,
    category: Array,
    gist: String,
    content: String,
    renderContent: String,
    readNum: Number,
    shareNum: Number,
    catalogId: String,
    likeNum: Number,
    // 创建时间
    createdTime: {type: Date, default: Date.now},
    // 修改时间
    updateTime: {type: Date, default: Date.now},
})
// 自增 ID 插件配置
articleSchema.plugin(autoIncrement.plugin, {
    model: 'Article',
    field: 'id',
    startAt: 1,
    incrementBy: 1,
});
module.exports = mongoose.model('Article', articleSchema)

