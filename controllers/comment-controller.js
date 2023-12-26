const { User, Restaurant, Comment } = require('../models')

const CommentController = {
  postComment: (req, res, next) => {
    const { text, restaurantId } = req.body
    const userId = req.user.id
    if (!text) throw new Error('請輸入評論!')
    return Promise.all([
      Restaurant.findByPk(restaurantId),
      User.findByPk(userId)
    ])
      .then(([restaurant, user]) => {
        if (!restaurant) throw new Error('沒有此餐廳!')
        if (!user) throw new Error('沒有此用戶!')
        return Comment.create({
          text,
          userId,
          restaurantId
        })
      })
      .then(() => {
        req.flash('success_messages', '成功新增評論!')
        res.redirect(`/restaurants/${restaurantId}`)
      })
      .catch(err => next(err))
  }
}

module.exports = CommentController
