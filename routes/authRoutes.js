const express = require('express');
const { signIn, signUp, googleAuth } = require('../controllers/authController');

const authRouter = express.Router();

// SignUp endpoint
authRouter.post('/api/signup', signUp);

// Sign in endpoint
authRouter.post('/api/signin', signIn);
   
// Google 
authRouter.post('/auth/google/callback', googleAuth);

module.exports = authRouter;

