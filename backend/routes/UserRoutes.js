const express = require('express')
const router = express.Router()

const { addUser, authUser } = require('../controllers/userController')

router.post('/adduser', addUser)
//router.post('/customerlogin',authUser)

module.exports = router
