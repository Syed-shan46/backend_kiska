const express = require('express');

const dotenv = require('dotenv');
dotenv.config();

// Routes
const connectDB = require('./config/db');
const authRouter = require('./routes/auth');

const app = express(); 
app.use(express.json());
app.use(authRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
})

// Connect DB
connectDB(); 
