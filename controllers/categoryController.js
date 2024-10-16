const Category = require('../models/category');

exports.uploadCategory = async (req, res) => {
  try {
    const { name, image, banner } = req.body;
    const category = new Category({ name, image, banner });
    await category.save();
    res.status(201).send(category);
  } catch (e) {
    res.status(500).json({ error: e.message });
  } 
}

exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
}
