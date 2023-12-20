const express = require('express')
const router = express.Router()
const restController = require('../controllers/restaurant-controllers')
const admin = require('./modules/admin')

router.use('/admin', admin)
router.get('/restaurants', restController.getRestaurants)

// 當都沒有匹對的路徑，最後會導向此路由
router.use('/', (req, res) => res.redirect('/restaurants'))

module.exports = router
