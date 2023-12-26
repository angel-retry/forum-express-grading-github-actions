const { Restaurant, Category } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')

const restController = {
  getRestaurants: (req, res) => {
    const DEFAULT_LIMIT = 9
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    const offset = getOffset(page, limit)

    // 先從網址上拿取參數categortId，再換成Number型態
    const categoryId = Number(req.query.categoryId) || '' // 有拿取categoryId或是空字串
    console.log('categoryId', categoryId)
    Promise.all([
      Restaurant.findAndCountAll({
        include: Category,
        nest: true,
        raw: true,
        where: { ...categoryId ? { categoryId } : {} }, // 運用三元運算子判斷，回傳{categoryId}or{}然後接觸展開運算子變成...{categoryId} or ...{} ，...{categoryId} = categoryId: categoryId
        limit,
        offset
      }),
      Category.findAll({ raw: true })
    ])

      .then(([restaurants, categories]) => {
        // restaurants為陣列，要調整裡面內容要用map修改
        const data = restaurants.rows.map(r => ({
          ...r, // 把r資料展開，...為展開運算子
          // 展開運算子後面如果有相同的key(屬性)，會以後面的為準
          // 把restaurants當中的description修改為50字以內
          description: r.description.substring(0, 50) // substring(index, index)可指定擷取幾字元至幾字元
        }))
        return res.render('restaurants', {
          restaurants: data,
          categories,
          categoryId,
          pagination: getPagination(limit, page, restaurants.count)
        }) // categoryId要拿回前面給ifCond用
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
