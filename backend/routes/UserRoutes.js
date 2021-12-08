const express = require('express')
const router = express.Router()

const { signUpUser } = require('../controllers/UserController')

router.route('/signup').post(signUpUser)

module.exports = router
