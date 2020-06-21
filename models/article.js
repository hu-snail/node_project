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
    tags: {type: Array, default: []},
    gist: String,
    content: String,
    coverImage: String,
    renderContent: String,
    // 关联文档的id
    catalogId: {type: String, index: true},
    readNum: {type: Number, default: 0},
    shareNum: {type: Number, default: 0},
    likeNum: {type: Number, default: 0},
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
articleSchema.index({ title: "text", content: "text" })
module.exports = mongoose.model('Article', articleSchema)

