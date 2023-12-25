const { Category } = require('../models')

const categoryController = {
  getCategories: (req, res, next) => {
    const { id } = req.params

    return Promise.all([
      Category.findAll({ raw: true }),
      // 判斷是否有id，如果沒有傳null即可
      id ? Category.findByPk(id, { raw: true }) : null
    ])
      .then(([categories, category]) => {
        res.render('admin/categories', { categories, category })
      })
      .catch(err => next(err))
  },
  postCategory: (req, res, next) => {
    const { name } = req.body
    if (!name) throw new Error('請輸入分類名稱!')
    return Category.create({
      name
    })
      .then(() => {
        req.flash('success_messages', '成功新增分類!')
        res.redirect('/admin/categories')
      })
      .catch(err => next(err))
  },
  putCategory: (req, res, next) => {
    const { name } = req.body
    const { id } = req.params
    if (!name) throw new Error('請輸入分類名稱!')
    return Category.findByPk(id)
      .then(category => {
        if (!category) throw new Error('沒有此分類!')
        return category.update({
          name
        })
      })
      .then(() => {
        req.flash('success_messages', '分類名稱更新成功!')
        res.redirect('/admin/categories')
      })
      .catch(err => next(err))
  },
  deleteCategory: (req, res, next) => {
    const { id } = req.params
    return Category.findByPk(id)
      .then(category => {
        if (!category) throw new Error('沒有此分類!')
        return category.destroy()
      })
      .then(() => {
        req.flash('success_messages', '成功刪除此分類!')
        res.redirect('/admin/categories')
      })
      .next(err => next(err))
  }
}

module.exports = categoryController
