const mongoose = require('mongoose')
const colors = require('colors')
//dotenv.config()
const connectdb = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://sparshar:Mongo123@cluster0.ulpix.mongodb.net/UberEats?retryWrites=true&w=majority',
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        //useCreateIndex: true,
      }
    )

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

module.exports = connectdb
