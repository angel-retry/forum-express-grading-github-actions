const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/restaurant-controller')
const admin = require('./modules/admin')
const userController = require('../controllers/user-controller')
const { generalErrorHandler } = require('../middlewares/error-handler')
const passport = require('../config/passport')
const { authenticated } = require('../middlewares/auth')

router.use('/admin', admin)

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', {
  failureRedirect: '/signin',
  failureFlash: true
}), userController.signIn)
router.post('/logout', userController.logout)

router.get('/restaurants', authenticated, restaurantController.getRestaurants)

router.use('/', (req, res) => {
  return res.redirect('/restaurants')
})

router.use('/', generalErrorHandler)

module.exports = router
