const express = require('express')
const router = express.Router()

const {
  getMenu,
  getMenuItembyid,
  updateMenu,
} = require('../controllers/AdminController')
router.get('/getRestaurantMenu/:restid', getMenu)
router.get('/getMenuItem/:dishid', getMenuItembyid)
router.post('/updateMenuItem', updateMenu)

//module.exports = router
