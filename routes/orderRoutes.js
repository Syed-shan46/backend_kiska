const express = require('express');
const { createOrder, getOrders, getallOrders } = require('../controllers/orderController');
const OrderRouter = express.Router();

OrderRouter.post('/api/orders', createOrder);

OrderRouter.get('/api/orders/:userId', getOrders);

OrderRouter.get('/api/all-orders',getallOrders);

module.exports = OrderRouter;