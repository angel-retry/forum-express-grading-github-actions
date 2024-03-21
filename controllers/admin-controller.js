const { Restaurant } = require('../models')
const localFileHandler = require('../helpers/file-helpers')

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
    console.log('req.body', req.body)
    if (!name || !tel || !address || !openingHours || !description) throw new Error('請把資料都填入!')
    const { file } = req
    localFileHandler(file)
      .then(filePath => {
        return Restaurant.create({ name, tel, address, openingHours, description, image: filePath || null })
          .then(() => {
            req.flash('success_messages', '餐廳新增成功!')
            return res.redirect('/admin/restaurants')
          })
          .catch(err => next(err))
      })
  },
  getRestaurant: (req, res, next) => {
    const { id } = req.params
    return Restaurant.findByPk(id, { raw: true })
      .then(restaurant => {
        return res.render('admin/restaurant', { restaurant })
      })
      .catch(err => next(err))
  },
  editRestaurant: (req, res, next) => {
    const { id } = req.params
    return Restaurant.findByPk(id, { raw: true })
      .then(restaurant => {
        return res.render('admin/edit-restaurant', { restaurant })
      })
      .catch(err => next(err))
  },
  putRestaurant: (req, res, next) => {
    const { id } = req.params
    const { name, tel, address, openingHours, description } = req.body
    if (!name || !tel || !address || !openingHours || !description) throw new Error('請把資料都填入!')
    console.log(req.body)
    const { file } = req
    Promise.all([
      localFileHandler(file),
      Restaurant.findByPk(id)
    ])
      .then(([filePath, restaurant]) => {
        return restaurant.update({ name, tel, address, openingHours, description, image: filePath || null })
          .then(() => {
            req.flash('success', '更新餐廳資料成功!')
            return res.redirect(`/admin/restaurants/${id}`)
          })
          .catch(err => next(err))
      })
  },
  deleteRestaurant: (req, res, next) => {
    const { id } = req.params
    return Restaurant.findByPk(id)
      .then(restaurant => {
        if (!restaurant) throw new Error('沒有這筆餐廳資料!')
        return restaurant.destroy()
      })
      .then(() => {
        req.flash('success', '刪除餐廳資料成功!')
        return res.redirect('/admin/restaurants')
      })
      .catch(err => next(err))
  }
}

module.exports = adminController
