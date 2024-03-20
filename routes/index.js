const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/restaurant-controller')
const admin = require('./modules/admin')
const db = require('../models')

router.use('/admin', admin)

router.get('/restaurants', restaurantController.getRestaurants)

router.use('/', (req, res) => {
  return res.redirect('/restaurants')
})

module.exports = router
