const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
        lowercase: true,
        validate: {
            validator: function (email) { 
                // Simple email format validation using regex
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: 'Please provide a valid email address',
        },
        message: 'Please provide a valid email address',
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        minlength: [6, 'Password must be at least 6 characters long'],
        validate: {
            validator: function (password) {
                // Custom password validation (e.g., must contain at least one number)
                return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(password);
            },
            message: 'Password must contain at least one number, one uppercase, and one lowercase letter',
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;