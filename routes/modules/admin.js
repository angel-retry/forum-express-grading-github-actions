const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')
const { authenticatedAdmin } = require('../../middlewares/auth')

router.get('/restaurants/create', authenticatedAdmin, adminController.createRestaurant)
router.get('/restaurants/:id/edit', authenticatedAdmin, adminController.editRestaurant)
router.get('/restaurants/:id', authenticatedAdmin, adminController.getRestaurant)
router.put('/restaurants/:id', authenticatedAdmin, adminController.putRestaurant)
router.get('/restaurants', authenticatedAdmin, adminController.getRestaurants)
router.post('/restaurants', authenticatedAdmin, adminController.postRestaurant)

router.use('/', (req, res) => {
  return res.redirect('/admin/restaurants')
})

module.exports = router
