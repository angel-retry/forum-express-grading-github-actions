const bcrypt = require('bcryptjs')
const { User } = require('../models')

const userController = {
  signUpPage: (req, res) => {
    return res.render('signup')
  },
  signUp: (req, res, next) => {
    const { name, email, password, passwordCheck } = req.body
    if (!name || !email || !password) throw new Error('Please enter these empty fields.')
    if (passwordCheck !== password) throw new Error('Password do not match!')
    User.findOne({ where: { email } })
      .then((user) => {
        if (user) throw new Error('Email already exists!')
        return bcrypt.hash(password, 10)
      })
      .then((hash) => {
        return User.create({ name, email, password: hash })
      })
      .then(user => {
        req.flash('success_messages', '帳號註冊成功!')
        res.redirect('/signin')
      })
      .catch(err => next(err))
  }
}

module.exports = userController
