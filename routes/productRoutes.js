const express = require('express');
const { addProduct, newProduct, recommended, products, productsByCategory } = require('../controllers/productController');
const ProductRouter = express.Router();

ProductRouter.post('/api/add-product', addProduct);

ProductRouter.get('/api/products', products);

ProductRouter.get('/api/popular', newProduct);

ProductRouter.get('/api/recommended', recommended);

ProductRouter.get('/api/category/:category', productsByCategory);

module.exports = ProductRouter;