const Address = require("../models/address");

exports.addAddress = async (req,res)=> {
    try {
        // Extract data from the request body
        const { name, phone, country, city, address } = req.body;
    
        // Create a new address document
        const newAddress = new Address({
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
        res.status(500).json({ error: 'Failed to save address' });
      }
}