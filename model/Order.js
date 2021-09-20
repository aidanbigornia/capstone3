const mongoose = require("mongoose");

let orderSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  orders: [
    {
      productId: {
        type: String,
      },
      name: {
        type: String,
      },
      price: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
      date: {
        type: Date,
        default: new Date()
      },
      subtotal: {
        type: Number,
        default: 0,
      },
    },
  ]
});

module.exports = mongoose.model("Order", orderSchema);
