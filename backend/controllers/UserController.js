const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

const signUpUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, address } = req.body

  try {
    const user = await User.findOne({ email: req.body.email })

    if (user) {
      res.status(400).send('User already exists')
    } else {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      const newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        address: address,
      })
      res.status(201).send(newUser)
    }
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})

module.exports = { signUpUser }
