const express = require('express');
const { sendOrderEmail } = require('../controllers/mailController');
const mailRouter = express.Router();

// Order route to handle order placement and email notification
mailRouter.post('/api/place-order', async (req, res) => {
  try {
    const orderDetails = req.body; // Get order details from request body
    await sendOrderEmail(orderDetails); // Send email notification
    res.status(200).json({ message: 'Order placed and email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error placing order or sending email', error });
  }
});

module.exports = mailRouter;
