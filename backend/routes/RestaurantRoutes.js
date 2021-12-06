const express = require('express')
const router = express.Router()

const {
  addRestaurant,
  getRestaurant,
  authRestaurant,
  addmenuItem,
  getAllRestaurants,
  getFilteredRestaurants,
  FilterRestaurantsByLocation,
} = require('../controllers/RestaurantController')
router.post('/addRestaurant', addRestaurant)
router.post('/authRestaurant', authRestaurant)
router.post('/addItem', addmenuItem)
router.get('/getRestaurant/:restid', getRestaurant)
router.get('/getAllRestaurants', getAllRestaurants)
router.get('/getFilteredRestaurants/:filtertype', getFilteredRestaurants)
router.get('/filterRestaurantByLocation/:location', FilterRestaurantsByLocation)

//module.exports = router
