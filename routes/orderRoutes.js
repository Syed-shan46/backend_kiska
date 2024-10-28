const express = require('express');
const { createOrder, getOrders } = require('../controllers/orderController');
const OrderRouter = express.Router();

OrderRouter.post('/api/orders', createOrder);

OrderRouter.get('/api/orders/:userId', getOrders);

module.exports = OrderRouter;