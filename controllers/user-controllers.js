const { User } = require('../models')
const bcrypt = require('bcryptjs')
const { localFileHandler } = require('../helpers/file-helpers')

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
  },
  signInPage: (req, res) => {
    return res.render('signin')
  },
  signIn: (req, res) => {
    req.flash('success_messages', '登入成功!')
    res.redirect('/restaurants')
  },
  logout: (req, res) => {
    req.flash('success_messages', '登出成功!')
    req.logout()
    res.redirect('/signin')
  },
  getUser: (req, res, next) => {
    const { id } = req.params
    return User.findByPk(id, { raw: true })
      .then(user => {
        res.render('profile', { user })
      })
      .catch(err => next(err))
  },
  editUser: (req, res, next) => {
    const { id } = req.params
    return User.findByPk(id, { raw: true })
      .then(user => {
        res.render('edit-profile', { user })
      })
      .catch(err => next(err))
  },
  putUser: (req, res, next) => {
    const { name } = req.body
    const { id } = req.params
    const { file } = req
    if (!name) throw new Error('請輸入名字!')
    return Promise.all([
      User.findByPk(id),
      localFileHandler(file)
    ])
      .then(([user, filePath]) => {
        if (!user) throw new Error('沒有此使用者!')
        return user.update({
          name,
          image: filePath || user.image
        })
      })
      .then(() => {
        req.flash('success_messages', '資料更新成功!')
        res.redirect(`/users/${id}`)
      })
      .catch(err => next(err))
  }
}

module.exports = userController
