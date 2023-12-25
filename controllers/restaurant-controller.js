const { Restaurant, Category } = require('../models')

const restController = {
  getRestaurants: (req, res) => {
    return Restaurant.findAll({
      include: Category,
      nest: true,
      raw: true
    })
      .then(restaurants => {
        // restaurants為陣列，要調整裡面內容要用map修改
        const data = restaurants.map(r => ({
          ...r, // 把r資料展開，...為展開運算子
          // 展開運算子後面如果有相同的key(屬性)，會以後面的為準
          // 把restaurants當中的description修改為50字以內
          description: r.description.substring(0, 50) // substring(index, index)可指定擷取幾字元至幾字元
        }))
        return res.render('restaurants', { restaurants: data })
      })
  },
  getRestaurant: (req, res, next) => {
    const { id } = req.params
    return Restaurant.findByPk(id, {
      include: Category
    })
      .then(restaurant => {
        if (!restaurant) throw new Error('沒有此餐廳')
        return restaurant.increment('viewCounts')
      })
      .then((restaurant) => {
        res.render('restaurant', { restaurant: restaurant.toJSON() })
      })
      .catch(err => next(err))
  },
  getDashboard: (req, res, next) => {
    const { id } = req.params
    return Restaurant.findByPk(id, {
      raw: true,
      include: Category,
      nest: true
    })
      .then(restaurant => {
        return res.render('dashboard', { restaurant })
      })
      .catch(err => next(err))
  }
}

module.exports = restController
