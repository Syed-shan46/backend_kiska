const Address = require("../models/address");
// Add Address
exports.addAddress = async (req, res) => {
  try {
    // Extract data from the request body
    const { userId, name, phone, country, city, address } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User is required' });
    }

    // Create a new address document
    const newAddress = new Address({
      userId,
      name,
      phone,
      country,
      city,
      address
    });

    // Save the document to the database
    await newAddress.save();

    // Send a success response
    res.status(201).json({ message: 'Address saved successfully!' });
  } catch (err) {
    // Handle errors and send failure response
    console.error('Error saving address:', err);
    res.status(500).json({ error: `Err:${err.message}` });
  }
}


// Check address
exports.checkAddress = async (req, res) => {
  const { userId } = req.params;
  try {
    // Check if the user has an address in the Address collection
    const address = await Address.findOne({ userId: userId });
    if (address) {
      res.status(200).json({ addressExists: true });
    } else {
      res.status(200).json({ addressExists: false });
    }

  } catch (error) {
    console.error('Error checking address:', error);
    res.status(500).json({ error: 'Server error. Could not check address.' });
  }
}

// Fetch address by user ID
exports.fetchAddressByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const address = await Address.findOne({ userId });
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.status(200).json(address);
  } catch (err) {
    console.error('Error fetching address:', err);
    res.status(500).json({ error: 'Failed to fetch address' });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { userId, name, phone, country, city, address } = req.body;

    const updatedAddress = await Address.findOneAndUpdate(
      { userId },
      { name, phone, country, city, address },
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found." });
    }

    res.status(200).json({ message: "Address updated successfully.", address: updatedAddress });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Failed to update address." });
  }
}