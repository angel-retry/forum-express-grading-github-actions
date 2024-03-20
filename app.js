const express = require('express')
const handlebars = require('express-handlebars')
const routes = require('./routes')
const app = express()
const port = process.env.PORT || 3000
const session = require('express-session')
const flash = require('connect-flash')


app.engine('hbs', handlebars({ extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: 'thisIsSecret',
  resave: false,
  saveUninitialized: false
}))
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  next()
})

app.use(routes)

app.listen(port, () => {
  console.info(`Example app is listening on http://localhost:${port}`)
})

module.exports = app
