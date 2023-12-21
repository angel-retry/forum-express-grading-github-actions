const { Restaurant } = require('../models')
const { localFileHandler } = require('../helpers/file-helpers')

const adminController = {
  getRestaurants: (req, res, next) => {
    Restaurant.findAll({
      raw: true
    })
      .then(restaurants => {
        return res.render('admin/restaurants', { restaurants })
      })
      .catch(err => next(err))
  },
  createRestaurant: (req, res) => {
    return res.render('admin/create-restaurant')
  },
  postRestaurant: (req, res, next) => {
    const { name, tel, address, openingHours, description } = req.body
    if (!name) throw new Error('請輸入餐廳名字!')
    // file從req取出
    const { file } = req
    // 取出檔案交給file-helpers處理會提供圖片檔路徑(filePath)
    localFileHandler(file)
      .then(filePath => {
        return Restaurant.create({
          name,
          tel,
          address,
          openingHours,
          description,
          image: filePath || null
        })
      })
      .then(() => {
        req.flash('success_messages', '新增成功!')
        res.redirect('/admin/restaurants')
      })
      .catch(err => next(err))
  },
  getRestaurant: (req, res, next) => {
    const id = req.params.id
    Restaurant.findByPk(id, {
      raw: true
    })
      .then(restaurant => {
        if (!restaurant) throw new Error('沒有此餐廳資料喔!')
        res.render('admin/restaurant', { restaurant })
      })
      .catch(err => next(err))
  },
  editRestaurant: (req, res, next) => {
    const id = req.params.id
    Restaurant.findByPk(id, {
      raw: true
    })
      .then(restaurant => {
        if (!restaurant) throw new Error('沒有此餐廳資料喔!')
        res.render('admin/edit-restaurant', { restaurant })
      })
      .catch(err => next(err))
  },
  putRestaurant: (req, res, next) => {
    const { name, tel, address, openingHours, description } = req.body
    const id = req.params.id
    if (!name) throw new Error('請輸入餐廳名字!')
    const { file } = req
    // 非同步處理
    Promise.all([
      Restaurant.findByPk(id),
      localFileHandler(file)
    ])
      // 更新用物件實例就好，不需要取出單純資料
      .then(([restaurant, filePath]) => {
        if (!restaurant) throw new Error('沒有此餐廳資料喔!')
        return restaurant.update({
          name,
          tel,
          address,
          openingHours,
          description,
          image: filePath || restaurant.image
        })
      })
      .then(() => {
        req.flash('success_messages', '更新成功!')
        res.redirect('/admin/restaurants')
      })
      .catch(err => next(err))
  },
  deleteRestaurant: (req, res, next) => {
    const id = req.params.id
    Restaurant.findByPk(id)
      .then(restaurant => {
        return restaurant.destroy()
      })
      .then(() => {
        req.flash('error_messages', '刪除成功!')
        res.redirect('/admin/restaurants')
      })
      .catch(err => next(err))
  }
}

module.exports = adminController
