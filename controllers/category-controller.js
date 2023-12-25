const { Category } = require('../models')

const categoryController = {
  getCategories: (req, res) => {
    return Category.findAll({ raw: true })
      .then(categories => {
        return res.render('admin/categories', { categories })
      })
  },
  postCategory: (req, res, next) => {
    const { category } = req.body
    if (!category) throw new Error('請輸入分類名稱!')
    return Category.create({
      name: category
    })
      .then(() => {
        req.flash('success_messages', '成功新增分類!')
        res.redirect('/admin/categories')
      })
      .catch(err => next(err))
  }
}

module.exports = categoryController
