const SubCategory = require('../models/subCategory');

exports.uploadSubCategory = async (req, res) => {
  try {
    const { categoryId, categoryName, image, subCategoryName } = req.body;
    const subCategory = new SubCategory({ categoryId, categoryName, image, subCategoryName });
    await subCategory.save();
    res.status(201).send(subCategory);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

exports.getSubCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;

    const subcategories = await SubCategory.find({ categoryName: categoryName });

    if (!subcategories || subcategories.length == 0) {
      return res.status(404).json({ msg: "SubCategories Not found" });
    }
    else {
      return res.status(200).json(subcategories);
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
