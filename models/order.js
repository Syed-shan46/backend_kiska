
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true, // Phone is mandatory
    trim: true
  },
  country: {
    type: String,
    required: true, // Country is mandatory
    trim: true
  },
  city: {
    type: String,
    required: true, // City is mandatory
    trim: true
  },
  address: {
    type: String,
    required: true, // Address is mandatory
    trim: true
  },

  productName: {
    type: String,
    required: true,
  },

  quantity: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  totalAmount: {
    type: Number,
    required: true,
  },

  paymentStatus: {
    type: String,
    enum: ['Pending', 'Success', 'Failed'],
    default: 'Pending',
  },

  delivered: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
