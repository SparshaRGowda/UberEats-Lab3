const express = require('express')

const router = express.Router()

const {
  addorder,
  readOrder_user,
  readOrder_rest,
  updateOrder_rest,
} = require('../controllers/OrderController')
router.post('/addorder', addorder)
router.get('/getuserorder/:userid', readOrder_user)
router.get('/getrestorder/:restid', readOrder_rest)
router.get('/updaterestorder/:orderid/:orderstatus', updateOrder_rest)
//module.exports = router
