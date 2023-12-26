const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')
const restController = require('../controllers/restaurant-controller')
const commentController = require('../controllers/comment-controller')
const userController = require('../controllers/user-controllers')
const { generalErrorHandler } = require('../middleware/error-handler')
const passport = require('../config/passport')
const { authenticated, authenticatedAdmin } = require('../middleware/auth')

router.use('/admin', authenticatedAdmin, admin)

router.get('/restaurants/:id', authenticated, restController.getRestaurant)
router.get('/restaurants/:id/dashboard', authenticated, restController.getDashboard)
router.get('/restaurants', authenticated, restController.getRestaurants)

router.get('/logout', userController.logout)
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)

router.delete('/comments/:id', authenticatedAdmin, commentController.deleteComment)
router.post('/comments', authenticated, commentController.postComment)

// 當都沒有匹對的路徑，最後會導向此路由
router.use('/', (req, res) => res.redirect('/restaurants'))
// 錯誤訊息要加在最後一行
router.use('/', generalErrorHandler)

module.exports = router
