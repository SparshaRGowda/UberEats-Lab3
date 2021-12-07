const asyncHandler = require('express-async-handler')

//const crypto = require('crypto')
const connectdb = require('../config/db')
const User = require('../models/userModel')

/*const addUser = asyncHandler(async (req, res) => {
  kafka.make_request('signup_user', req.body, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err,
      })
    } else {
      res.status(200).send({
        results,
      })
    }
  })
})*/

module.exports = { addUser }
