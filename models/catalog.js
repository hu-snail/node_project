/**
 * catalog modules
 * @file 文件目录模型
 * @author hujiangjun<https://github.com/hu-snail>
 */

const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');

const catalogSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    children: {type: Array, default: []},
    isAdd: {type: Boolean, default: false},
    // 创建时间
    createdTime: {type: Date, default: Date.now},
    // 修改时间
    updateTime: {type: Date, default: Date.now},
})
// 自增  ID 插件配置
catalogSchema.plugin(autoIncrement.plugin, {
    model: 'Catalog',
    field: 'id',
    startAt: 1,
    incrementBy: 1,
});
module.exports = mongoose.model('Catalog', catalogSchema)

