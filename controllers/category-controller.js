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
    return Category.findByPk(req.params.id)
      .then(category => {
        if (!category) throw new Error("Category didn't exist!") // 反查，確認要刪除的類別存在，再進行下面刪除動作
        return category.destroy()
      })
      .then(() => {
        req.flash('success_messages', '成功刪除分類!')
        res.redirect('/admin/categories')
      })
      .catch(err => next(err))
  }
}

module.exports = categoryController
