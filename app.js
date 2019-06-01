const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const ejs = require('ejs')
const session = require('express-session')

const app = express()

// 跨域处理
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine('.html', ejs.__express) // 设置视图引擎后缀，为.html
app.set('view engine', 'html') // 设置视图引擎为html

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
    secret: 'secret',
    name: 'session_id',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 1000 * 30, httpOnly: true }, // 过期时间
}));

// 连接数据库 mongod
const mongoose = require('./config/mongodb')
mongoose.connect()

//将路由文件引入
const router = require('./routes/index')

//初始化所有路由
router(app)

// catch 404 and forward to error handler
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*") // 允许的来源
    res.header("Access-Control-Allow-Headers","Content-Type") // 请求的头部
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS") // 允许请求的方法
    next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
