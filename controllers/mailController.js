// emailController.js
const nodemailer = require('nodemailer');

// Configure email transporter (use your email service credentials)
const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use any email service like SMTP, Gmail, etc.
    auth: {
        user: process.env.ADMIN_EMAIL, // Your email address
        pass: process.env.ADMIN_PASSWORD, // Your email password or app password
    },
});

exports.sendOrderEmail = async (orderDetails) => {
  const { _id: orderId, products, totalAmount, userEmail } = orderDetails;

  // Validate required fields
  if (!orderId || !products || !totalAmount || !userEmail) {
      console.error('Missing required fields in orderDetails:', orderDetails);
      return;
  }

  const productList = products.map((product) =>
      `<li>${product.name} (Qty: ${product.quantity}) - ₹${product.price}</li>`
  ).join('');

  const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `New Order Placed: ${orderId}`,
      html: `
          <h3>New Order Details</h3>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
          <p><strong>User Email:</strong> ${userEmail}</p>
          <h4>Products:</h4>
          <ul>${productList}</ul>
      `,
  };

  try {
      await transporter.sendMail(mailOptions);
      console.log('Order email sent successfully to admin');
  } catch (error) {
      console.error('Error sending order email:', error);
      throw new Error('Failed to send order email');
  }
};


// Function to send email to the user when the order is being processed
exports.sendOrderProcessingEmail = async (userEmail, orderId) => {
    // Create email content
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: userEmail, // Send email to the user
      subject: `Order #${orderId} - Processing`,
      html: `
        <h3>Your Order is Being Processed</h3>
        <p>Dear Customer,</p>
        <p>Your order with Order ID: ${orderId} is being processed and will arrive in the next few days.</p>
        <p>Thank you for your patience!</p>
        <p>Best Regards,</p>
        <p>Your Store Name</p>
      `,
    };
  
    // Send the email
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Order processing email sent successfully to ${userEmail}`);
    } catch (error) {
      console.error('Error sending order processing email:', error);
      throw new Error('Failed to send order processing email');
    }
  };