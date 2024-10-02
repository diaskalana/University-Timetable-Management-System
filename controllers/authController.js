const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


// User registration
exports.register = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        user = new User({
            username,
            email,
            password,
            role
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user to database
        await user.save();

        // Generate JWT token
        const payload = {
            userId: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (error, token) => {
            if (error) throw error;
            res.json({ token });
        });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const payload = {
            userId: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (error, token) => {
            if (error) throw error;
            // Save token in cookies
            saveTokenInCookies(res, token);
            res.json({ token });
        });
    } catch (error) {
        console.error('Error logging in user:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getUser = async (req, res) => {
    try {
        // Fetch user from database
        const user = await User.findById(req.user.userId).select('-password');
        res.json({ user });
    } catch (error) {
        console.error('Error fetching current user:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.updateUser = async (req, res) => {
    const { username, email, password } = req.body;
    const userId = req.user.userId;

    try {
        // Fetch user from database
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user details
        if (username) user.username = username;
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        // Save updated user
        await user.save();

        // Generate JWT token
        const payload = {
            userId: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (error, token) => {
            if (error) throw error;
            // Save token in cookies
            saveTokenInCookies(res, token);
            res.json({ token });
        });
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.logout = async (req, res) => {
    try {
        // Clear the JWT token by setting it to an empty string
        res.clearCookie('token'); // Clear the token from cookies if using cookies for token storage
        res.json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error logging out user:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
}


// Function to save token in cookies
const saveTokenInCookies = (res, token) => {
    res.cookie('token', token, { httpOnly: true }); // Save token in a cookie named 'token'
};