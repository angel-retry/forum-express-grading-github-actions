const { Restaurant } = require('../models')

const adminController = {
  getRestaurants: (req, res, next) => {
    return Restaurant.findAll({ raw: true })
      .then(restaurants => {
        return res.render('admin/restaurants', { restaurants })
      })
      .catch(err => next(err))
  },
  createRestaurant: (req, res, next) => {
    return res.render('admin/create-restaurants')
  },
  postRestaurant: (req, res, next) => {
    const { name, tel, address, openingHours, description } = req.body
    console.log(req.body)
    if (!name || !tel || !address || !openingHours || !description) throw new Error('請把資料都填入!')
    return Restaurant.create({ name, tel, address, openingHours, description })
      .then(() => {
        req.flash('success_messages', '餐廳新增成功!')
        return res.redirect('/admin/restaurants')
      })
      .catch(err => next(err))
  },
  getRestaurant: (req, res, next) => {
    const { id } = req.params
    return Restaurant.findByPk(id, { raw: true })
      .then(restaurant => {
        return res.render('admin/restaurant', { restaurant })
      })
      .catch(err => next(err))
  }
}

module.exports = adminController
