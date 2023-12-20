const { raw } = require('express')
const { User } = require('../models')
const bcrypt = require('bcryptjs')

const userController = {
  signUpPage: (req, res) => {
    return res.render('signup')
  },
  signUp: (req, res, next) => {
    if (req.body.password !== req.body.passwordCheck) throw new Error('驗證密碼輸入錯誤!')
    if (!req.body.name) throw new Error('請輸入名字!')
    User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user) throw new Error('此信箱已被註冊!')
        return bcrypt.hash(req.body.password, 10)
      })
      .then(hash => {
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash
        })
      })
      .then(() => {
        req.flash('success_messages', '帳戶註冊成功!')
        res.redirect('/signin')
      })
      .catch(err => next(err))
  }
}

module.exports = userController
