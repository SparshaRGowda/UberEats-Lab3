const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const connectdb = require('./config/db')
const userRoutes = require('./routes/userRoutes')

const app = express()
app.use(express.json())

app.use('/api/users', userRoutes)

dotenv.config()

connectdb()

app.get('/', (req, res) => {
  res.send('API is running....')
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
