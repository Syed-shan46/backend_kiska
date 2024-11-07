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

exports.productsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error loading Products', error });
  }
}

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, productPrice, quantity, description, category, subCategory, images, popular, recommend } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { productName, productPrice, quantity, description, category, subCategory, images, popular, recommend },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete the product
    await Product.findByIdAndDelete(productId);

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error); // Logs detailed error in the server console
    return res.status(500).json({
      message: 'Server error occurred while deleting the product',
      error: error.message  // Includes the specific error message in the response
    });

  }
}
