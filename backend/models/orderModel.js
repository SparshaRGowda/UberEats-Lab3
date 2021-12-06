const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    restid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
    },
    orderstatus: {
      type: String,
    },
    ordertotal: {
      type: Number,
    },
    special_instructions: {
      type: String,
    },
    order_details: [
      {
        dishname: { type: String },
        dishquant: { type: Number },
        dishprice: { type: Number },
        dishtype: { type: String },
      },
    ],
  },
  { timestamps: true }
)

const Order = mongoose.model('Order', orderSchema)
module.exports = Order
