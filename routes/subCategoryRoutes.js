const express = require('express');
const { uploadSubCategory, getSubCategory } = require('../controllers/subCategoryController');
const subCategoryRouter = express.Router();

subCategoryRouter.post('/api/subcategories', uploadSubCategory);

subCategoryRouter.get('/api/category/:categoryName/subcategories', getSubCategory);

module.exports = subCategoryRouter;