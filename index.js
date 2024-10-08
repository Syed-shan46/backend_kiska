const express = require('express');
const User = require('./models/user');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const passport = require('passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');
dotenv.config();


// Routes
const connectDB = require('./config/db');
const authRouter = require('./routes/authRoutes');
const app = express();

app.use(cors());

// Configure session middleware
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    keys: [process.env.COOKIE_KEY],
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Configure passport to use Google strategy
passport.use(new GoogleStrategy({
    clientID: '330986173197-44pk2aeiiobc4ln04qttsb0uflp3cpmu.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/auth/google',  
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Check if user already exists in the database
            let user = await User.findOne({ googleId: userName.id });

            if (!user) {
                // If user does not exist, create a new one
                user = new User({
                    googleId: userName.id,
                    email: profile.emails[0].value, // Get email from profile
                });

                await user.save(); // Save the new user
            }

            done(null, user); // Return the user for serialization
        } catch (error) {
            console.error(error);
            done(error, false); // Handle errors
        }
    }

));

// Serialize user into the session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Routes
app.get('/auth/google', passport.authenticate('google', {
    scope: ['email']
}));




app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Use body-parser middleware to parse incoming JSON requests
app.use(bodyParser.json()); // To parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded data
app.use(express.json());
app.use(authRouter);

// Start the server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

// Connect DB
connectDB(); 
