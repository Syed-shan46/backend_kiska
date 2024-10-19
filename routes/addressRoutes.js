const express = require('express');
const { addAddress } = require('../controllers/addressController');

const AddressRouter = express.Router();

AddressRouter.post('/api/add-address',addAddress);

module.exports = AddressRouter;