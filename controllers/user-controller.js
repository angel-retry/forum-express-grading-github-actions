const bcrypt = require('bcryptjs')
const { User } = require('../models')

const userController = {
  signUpPage: (req, res) => {
    return res.render('signup')
  },
  signUp: (req, res) => {
    const { name, email, password } = req.body
    return bcrypt.hash(password, 10)
      .then((hash) => {
        return User.create({ name, email, password: hash })
          .then(() => res.redirect('/signin'))
      })
  }
}

module.exports = userController
