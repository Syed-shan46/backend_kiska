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

exports.sendOrderEmail = async ({ orderId, products, totalAmount, userEmail }) => {
  const productList = products
    .map((product) => `<li>${product.name} (Qty: ${product.quantity}) - ₹${product.price}</li>`)
    .join('');

  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: `New Order Placed: ${orderId}`,
    html: `
      <h3>New Order Details</h3>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
      <p><strong>User Email:</strong> ${userEmail}</p>
      <ul>${productList}</ul>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Admin notified of new order');
  } catch (error) {
    console.error('Error sending admin email during order creation:', error);
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

exports.sendUserOrderConfirmation = async ({ orderId, userEmail, userName, products, totalAmount }) => {
  if (!userEmail) {
    console.error('User email is missing!');
    return;
  }

  const productList = products
    .map((product) => `<li>${product.name} (Qty: ${product.quantity}) - ₹${product.price}</li>`)
    .join('');

  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: userEmail, // Send to user's email
    subject: `Order Confirmation: ${orderId}`,
    html: `
        <h3>Thank you for your order, ${userName}!</h3>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
        <h4>Your Order Details:</h4>
        <ul>${productList}</ul>
        <p>Your order has been accepted and is now being processed.</p>
        <p>We will update you once it is shipped. Thank you for shopping with us!</p>
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent to user successfully');
  } catch (error) {
    console.error('Error sending user confirmation email:', error);
  }
};