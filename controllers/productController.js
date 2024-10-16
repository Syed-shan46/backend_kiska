const Product = require('../models/product');

exports.addProduct = async (req, res) => {
  try {
    const { productName, productPrice, quantity, description, category, subCategory, images, popular, recommend } = req.body
    const product = new Product({ productName, productPrice, quantity, description, category, popular, recommend, subCategory, images });
    await product.save();
    return res.status(201).send(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

exports.products = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
}

exports.newProduct = async (req, res) => {
  try {
    const product = await Product.find({ popular: true });
    if (!product || product.length == 0) {
      return res.status(404).json({ msg: 'Products not found' });
    } else {
      return res.status(200).json({ product });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

exports.recommended = async (req, res) => {
  try {
    const product = await Product.find({ recommend: true });
    if (!product || product.length == 0) {
      return res.status(404).json({ msg: 'Products not found' });
    } else {
      return res.status(200).json({ product });
    }
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
}