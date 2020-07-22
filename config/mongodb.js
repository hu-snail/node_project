
/**
 * MongoDB module
 * @file 数据库模块
 * @author hujiangjun<https://github.com/hu-snail>
 */

const mongoose = require('mongoose')
// 日志打印
const logger = require('pomelo-logger').getLogger('mongodb-log')
// id自增
const autoIncrement = require('mongoose-auto-increment')
// 配置文件
const CONFIG = require('../config')

// 删除折旧警告
mongoose.set('useFindAndModify', false)

// mongoose Promise
mongoose.Promise = global.Promise

// 连接数据库
exports.connect = () => {
    mongoose.connect(CONFIG.MONGODB.DB_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useMongoClient: true,
        promiseLibrary: global.Promise
    })

    // 连接错误
    mongoose.connection.on('error', error => {
        logger.error('数据库连接失败!', error)
    })

    // 连接成功
    mongoose.connection.once('open', () => {
        logger.info('数据库连接成功!')
    })

    // 连接断开
    mongoose.connection.on('disconnected', () => {
        logger.error('Mongoose断开')
    })

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            logger.info('Mongoose通过应用程序终止断开连接')
            process.exit(0)
        })
    })

    // 自增 ID 初始化
    autoIncrement.initialize(mongoose.connection)
        
    // 返回实例
    return mongoose
}