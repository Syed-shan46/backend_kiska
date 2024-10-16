const express = require('express');
const { uploadCategory, getCategory } = require('../controllers/categoryController');
const categoryRouter = express.Router();

categoryRouter.post('/api/category', uploadCategory);
 
categoryRouter.get('/api/categories', getCategory);

module.exports = categoryRouter;