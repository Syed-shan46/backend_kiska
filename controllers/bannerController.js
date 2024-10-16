const Banner = require('../models/banner');

exports.uploadBanner = async (req, res) => {
  try {
    const { image } = req.body;
    const banner = new Banner({ image });
    await banner.save();
    return res.status(201).send(banner);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

exports.getBanner = async (req, res) => {
  try {
    const banners = await Banner.find();
    return res.status(200).send(banners);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

