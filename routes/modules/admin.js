const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')
const { authenticatedAdmin } = require('../../middlewares/auth')

router.get('/restaurants', authenticatedAdmin, adminController.getRestaurants)
router.get('/restaurants/create', authenticatedAdmin, adminController.createRestaurant)
router.post('/restaurants', authenticatedAdmin, adminController.postRestaurant)
router.get('/restaurants/:id', authenticatedAdmin, adminController.getRestaurant)

router.use('/', (req, res) => {
  return res.redirect('/admin/restaurants')
})

module.exports = router
