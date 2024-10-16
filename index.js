const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

// Routes
const connectDB = require('./config/db');
const authRouter = require('./routes/authRoutes');
const bannerRouter = require('./routes/bannerRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const subCategoryRouter = require('./routes/subCategoryRoutes');
const productRouter = require('./routes/productRoutes');

const app = express();

// Use body-parser middleware to parse incoming JSON requests
app.use(bodyParser.json()); // To parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded data
app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(bannerRouter);
app.use(categoryRouter);
app.use(subCategoryRouter);
app.use(productRouter);


// Start the server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

// Connect DB
connectDB().then(() => {
    console.log('Database Connected Successfully')
}).catch((err) => {
    console.log('Failed to connect to the database:', err.message);
})
