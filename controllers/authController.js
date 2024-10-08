const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = "330986173197-44pk2aeiiobc4ln04qttsb0uflp3cpmu.apps.googleusercontent.com";
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Initialize the OAuth Client 
const client = new OAuth2Client(CLIENT_ID);

// Function to validate email format
const validateEmail = (email) => {
  // Simple email format validation using regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};


// SignUp 
exports.signUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Basic password validation

    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({ msg: "Password must contain at least one uppercase letter." });
    }
    if (!/[0-9]/.test(password)) {
      return res.status(400).json({ msg: "Password must contain at least one number." });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ msg: "User already exists" });
    }
    else {
      const salt = await bcrypt.genSalt(10)

      const hashedPassword = await bcrypt.hash(password, salt);

      let user = new User({ userName, email, password: hashedPassword });
      user = await user.save();
      res.json({ user });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
}

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });

    // Validate email
    if (!validateEmail(email)) {
      return res.status(400).json({ msg: 'Please provide a valid email ' });
    }

    // Finding user
    if (!findUser) {
      return res.status(400).json({ msg: 'User not found' });
    }
    else {
      const isMatch = await bcrypt.compare(password, findUser.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Incorrect Password' });
      }
      else {

        const token = jwt.sign({ id: findUser._id }, 'passwordKey');

        // Remove sensitive information
        const { password, ...userWithoutPassword } = findUser._doc;

        // Send the response
        res.json({ token, ...userWithoutPassword });
      }
    }
  } catch (error) {

  }
}

exports.googleAuth = async (req, res) => {
  const { idtoken } = req.body;

  if (!idtoken) {
    return res.status(400).send('ID token is required');
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: idtoken,
      audience: "330986173197-lng6grl9r7422o1i05cj1316r4o28esc.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend 
      
    });
    const payload = ticket.getPayload();
    const userid = payload['email']; // Use this ID to identify the user in your database

    // Here you would usually find/create a user in your database
    res.json({ user: payload });
  } catch (error) {
    console.error('Error verifying ID token:', error);
    res.status(401).send('Invalid ID token');
  }
}
