const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/restaurant-controller')
const admin = require('./modules/admin')
const userController = require('../controllers/user-controller')

router.use('/admin', admin)

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

router.get('/restaurants', restaurantController.getRestaurants)

router.use('/', (req, res) => {
  return res.redirect('/restaurants')
})

module.exports = router
