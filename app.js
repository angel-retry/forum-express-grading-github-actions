const express = require('express')
const routes = require('./routes')
const handlebars = require('express-handlebars')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const { getUser } = require('./helpers/auth-helpers')
const handlebarsHelpers = require('./helpers/handlebars-helpers')
const methodOverride = require('method-override')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000
const SESSION_SECRET = 'secrect'

app.engine('.hbs', handlebars({ extname: 'hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(methodOverride('_method'))
app.use('/upload', express.static(path.join(__dirname, '/upload'))) // express.static 接收參數為該文件的根目錄，會返回一個中間件函數，其中path.join(__dirname, '/upload')意思是在/upload路徑查找
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = getUser(req) // 透過passport回傳user資料
  next()
})
app.use(routes)

app.listen(port, () => {
  console.info(`App is on http://localhost:${port}`)
})

module.exports = app
