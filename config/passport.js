const passport = require('passport')
const LocalStrategy = require('passport-local')
const { User, Restaurant } = require('../models')
const bcrypt = require('bcryptjs')

passport.use(new LocalStrategy({
  // 設定客製化選項
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true // 可使用req.flash()
}, (req, email, password, cb) => { // 確認使用者帳號是否存在
  User.findOne({ where: { email } })
    .then(user => {
      // null代表沒有錯誤發生，第二個參數為user代表成功登入且傳送user資料;如果第二個參數為false代表登入失敗
      if (!user) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤!'))
      bcrypt.compare(password, user.password)
        .then(res => {
          if (!res) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤!'))
          return cb(null, user)
        })
    })
}))

// 序列化，把user.id存取在session裡即可，因passport預設會把user全部資料存在session，會占用很多空間，所以要設置存取user.id即可
passport.serializeUser((user, cb) => {
  return cb(null, user.id)
})

// 反序列化，可用user.id找回原本user的全部資料
passport.deserializeUser((id, cb) => {
  User.findByPk(id, {
    include: [
      { model: Restaurant, as: 'FavoritedRestaurants' }, // **可以在passport就撈出使用者收藏過的餐廳
      { model: Restaurant, as: 'LikedRestaurants' }
    ]
  })
    .then(user => cb(null, user.toJSON())) // 利用toJSON()把user物件格式處理好，資料就可以方便取用
    .catch(err => cb(err))
})

module.exports = passport
