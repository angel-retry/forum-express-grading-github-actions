const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')
const { authenticatedAdmin } = require('../../middlewares/auth')
const upload = require('../../middlewares/multer')

router.get('/restaurants/create', authenticatedAdmin, adminController.createRestaurant)
router.get('/restaurants/:id/edit', authenticatedAdmin, adminController.editRestaurant)
router.get('/restaurants/:id', authenticatedAdmin, adminController.getRestaurant)
router.put('/restaurants/:id', upload.single('image'), authenticatedAdmin, adminController.putRestaurant)
router.delete('/restaurants/:id', authenticatedAdmin, adminController.deleteRestaurant)
router.get('/restaurants', authenticatedAdmin, adminController.getRestaurants)
router.post('/restaurants', upload.single('image'), authenticatedAdmin, adminController.postRestaurant)

router.use('/', (req, res) => {
  return res.redirect('/admin/restaurants')
})

module.exports = router
