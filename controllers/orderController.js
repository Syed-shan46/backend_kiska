const Address = require('../models/address');
const Order = require('../models/order');
const { sendOrderEmail } = require('./mailController');

exports.createOrder = async (req, res) => {
  try {
    const { userId, name, phone, country, city, address, productName, quantity, category, image, totalAmount, paymentStatus } = req.body;

    const createAt = new Date().getMilliseconds()

    // Create the products array (assuming one product per order for now)
    const products = [{
      name: productName,
      quantity: quantity,
      category: category,
      image: image,
      price: totalAmount, // Assuming the total amount is the product price
    }];

    // Create the order 
    const newOrder = new Order({
      userId,
      name,
      phone,
      country,
      address,
      city,
      productName,
      quantity,
      category,
      image,
      totalAmount,
      paymentStatus,
      createAt,
      products,
    });

    await newOrder.save();
    // Send order details email to admin
    await sendOrderEmail({
      orderId: newOrder._id,
      products: products, // Passing the products array
      totalAmount: totalAmount,
      userEmail: req.body.email || 'User email not provided',
    });
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
}

exports.getOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    if (orders.length == 0) {
      return res.status(404).json({ msg: 'No orders found for this ' })
    }

    return res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
}

exports.getallOrders = async(req,res)=> {
  try {
    const orders = await Order.find();

    if(orders.length === 0){
      return res.status(404).json({msg: 'No Orders found'});
    }


    return res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.acceptOrder = async (req, res) => {
  const { orderId } = req.body; // assuming you get the orderId from the request body

  try {
      // Find the order in the database by its ID
      const order = await Order.findById(orderId).populate('products'); // You can adjust as needed based on your schema

      if (!order) {
          console.error(`Order with ID ${orderId} not found.`);
          return res.status(404).json({ message: 'Order not found' });
      }

      // Prepare the order details object to be passed into sendOrderEmail
      const orderDetails = {
          _id: order._id,  // Order ID from the database
          products: order.products,  // Products in the order (can be populated based on your schema)
          totalAmount: order.totalAmount,  // Total amount for the order
          userEmail: order.userId.email,  // User's email from the order data
      };

      console.log("Sending email to:", orderDetails.userEmail);

      // Call the function to send the email
      await sendOrderEmail(orderDetails);

      // Send a success response to the client
      res.status(200).json({ message: 'Order accepted and email sent to admin.' });
  } catch (error) {
      console.error('Error accepting order:', error);
      res.status(500).json({ message: 'Failed to accept order' });
  }
};



