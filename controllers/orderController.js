const Address = require('../models/address');
const Order = require('../models/order');

exports.createOrder = async (req, res) => {
  try {
    const { userId, name, phone, country, city, address, productName, quantity, category, image, totalAmount, paymentStatus } = req.body;

    const createAt = new Date().getMilliseconds()
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
    });

    await newOrder.save();
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


