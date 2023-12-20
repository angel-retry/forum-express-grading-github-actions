const express = require('express')
const router = express.Router()
const restController = require('../controllers/restaurant-controller')
const admin = require('./modules/admin')
const userController = require('../controllers/user-controllers')
const { generalErrorHandler } = require('../middleware/error-handler')

router.use('/admin', admin)
router.get('/restaurants', restController.getRestaurants)
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
// 當都沒有匹對的路徑，最後會導向此路由
router.use('/', (req, res) => res.redirect('/restaurants'))
// 錯誤訊息要加在最後一行
router.use('/', generalErrorHandler)

module.exports = router
