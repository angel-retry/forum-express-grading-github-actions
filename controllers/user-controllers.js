const { User } = require('../models')
const bcrypt = require('bcryptjs')

const userController = {
  signUpPage: (req, res) => {
    return res.render('signup')
  },
  signUp: (req, res) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash
        })
      })
      .then(() => {
        res.redirect('/signin')
      })
  }
}

module.exports = userController