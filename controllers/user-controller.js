const { User, Comment, Restaurant, Favorite } = require('../models')
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
    return User.findByPk(id, {
      include: [{ model: Comment, include: Restaurant }]
    })
      .then(user => {
        if (!user) throw new Error('沒有此使用者!')
        // 把資料toJSON()化
        user = user.toJSON()
        // 新增user屬性CommentedRestaurants存放餐廳資訊
        user.CommentedRestaurants = user.Comments && user.Comments.map(c => c.Restaurant)
        res.render('users/profile', { user })
      })
      .catch(err => next(err))
  },
  editUser: (req, res, next) => {
    const { id } = req.params
    return User.findByPk(id, { raw: true })
      .then(user => {
        res.render('users/edit', { user })
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
        req.flash('success_messages', '使用者資料編輯成功')
        res.redirect(`/users/${id}`)
      })
      .catch(err => next(err))
  },
  addFavorite: (req, res, next) => {
    const { restaurantId } = req.params
    const userId = req.user.id
    // 加入我的最愛之前，先做防呆:1.是否有這間餐廳 2.使用者是否有重複把餐廳加到我的最愛
    return Promise.all([
      Restaurant.findByPk(restaurantId),
      // Favorite利用findOne使用where查詢資料。 不用加上raw:true，因為不會用到純資料。
      Favorite.findOne({
        where: {
          userId,
          restaurantId
        }
      })
    ])
      .then(([restaurant, favorite]) => {
        if (!restaurant) throw new Error('沒有此餐廳!')
        if (favorite) throw new Error('已經加到最愛餐廳了!')
        return Favorite.create({
          userId,
          restaurantId
        })
      })
      .then(() => {
        req.flash('success_messages', '成功加到最愛!')
        res.redirect('back')
      })
      .catch(err => next(err))
  },
  removeFavorite: (req, res, next) => {
    const { restaurantId } = req.params
    const userId = req.user.id
    return Favorite.findOne({
      where: {
        restaurantId,
        userId
      }
    })
      .then(favorite => {
        if (!favorite) throw new Error('沒有將此餐廳加到我的最愛!無法移除!')
        return favorite.destroy()
      })
      .then(() => {
        req.flash('success_messages', '已移除掉我的最愛!')
        res.redirect('back')
      })
      .catch(err => next(err))
  }
}

module.exports = userController
