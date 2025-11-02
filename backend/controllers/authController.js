const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Helper function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

// @desc    Register a new user (admin)
// @route   POST /api/auth/register
// @access  Public (or protected in production)
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user (password hashing is handled by the model hook)
    const user = await User.create({
      username,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error); // Log the full error for yourself
    res.status(500).json({ 
      message: 'Server Error',
      // Only send the detailed error in development mode
      error: process.env.NODE_ENV === 'development' ? error.message : {} 
    });
  }
};

// @desc    Authenticate user (admin) & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for user by email
    const user = await User.findOne({ where: { email } });

    // Check if user exists AND password matches
    if (user && (await user.isValidPassword(password))) {
      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      // Use generic message for security
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error); // Log the full error for yourself
    res.status(500).json({ 
      message: 'Server Error',
      // Only send the detailed error in development mode
      error: process.env.NODE_ENV === 'development' ? error.message : {} 
    });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  // req.user is attached by the 'protect' middleware
  res.status(200).json(req.user);
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};