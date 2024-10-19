// Import mongoose
const mongoose = require('mongoose');

// Create a schema for the model
const addressSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true, // Name is mandatory
    trim: true // Removes whitespace
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
  }
});

// Create a model using the schema
const Address = mongoose.model('Address', addressSchema);

// Export the model
module.exports = Address;
