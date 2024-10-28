const express = require('express');
const { addAddress, checkAddress, fetchAddressByUserId, updateAddress } = require('../controllers/addressController');

const AddressRouter = express.Router();

AddressRouter.post('/api/add-address', addAddress);

AddressRouter.get('/api/check-address/:userId', checkAddress);

AddressRouter.get('/api/get-address/:userId', fetchAddressByUserId);

AddressRouter.put('/api/update-address/:userId', updateAddress);

module.exports = AddressRouter;