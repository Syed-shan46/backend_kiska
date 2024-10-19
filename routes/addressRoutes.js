const express = require('express');
const { addAddress, checkAddress, fetchAddressByUserId } = require('../controllers/addressController');

const AddressRouter = express.Router();

AddressRouter.post('/api/add-address', addAddress);

AddressRouter.get('/api/check-address/:userId', checkAddress);

AddressRouter.get('/api/get-address/:userId', fetchAddressByUserId);

module.exports = AddressRouter;