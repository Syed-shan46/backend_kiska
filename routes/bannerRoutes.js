const express = require('express');
const { uploadBanner, getBanner } = require('../controllers/bannerController');
const bannerRouter = express.Router();

bannerRouter.post('/api/banner', uploadBanner);

bannerRouter.get('/api/banner', getBanner); 
   
module.exports = bannerRouter;