const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
 
// Routes
const connectDB = require('./config/db');
const authRouter = require('./routes/auth');
const app = express(); 

// Use body-parser middleware to parse incoming JSON requests
app.use(bodyParser.json()); // To parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded data
app.use(express.json());
app.use(authRouter);

// Start the server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
});

// Connect DB
connectDB(); 
