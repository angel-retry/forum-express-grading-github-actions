const { Category } = require('../models')

const categoryController = {
  getCategories: (req, res) => {
    return Category.findAll({ raw: true })
      .then(categories => {
        return res.render('admin/categories', { categories })
      })
  }
}

module.exports = categoryController
