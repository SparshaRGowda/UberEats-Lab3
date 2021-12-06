const mongoose = require('mongoose')

const restaurantSchema = mongoose.Schema(
  {
    restname: {
      type: String,
    },

    remail: {
      type: String,
      unique: true,
    },
    rpassword: {
      type: String,
    },
    rlocation: {
      type: String,
    },
    rtype: {
      type: String,
    },
    rdtype: {
      type: String,
    },
    /*rimage: {
      type: String,
    },*/
    rest_menu: [
      {
        dishname: { type: String },
        dishprice: { type: Number },
        dishquant: { type: Number },
        dishtype: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant
