const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();

// Function to validate email format
const validateEmail = (email) => {
    // Simple email format validation using regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// SignUp endpoint
authRouter.post('/api/signup', async (req, res) => {
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
});

// Sign in endpoint
authRouter.post('/api/signin', async (req, res) => {
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
});

module.exports = authRouter;

