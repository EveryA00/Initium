const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const User = require('../models/User');
const { validateSignup, validateSignin } = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');
const { findUserByEmail, findUserById, getPublicProfile, addUser, updateUser } = require('../utils/memoryStorage');

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );
};

// Helper function to hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

// Helper function to compare password
const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};



// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', validateSignup, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'user',
      isEmailVerified: false,
      isActive: true,
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const savedUser = addUser(user);

    // Generate token
    const token = generateToken(savedUser._id);

    // Return user data (without password) and token
    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      data: {
        user: getPublicProfile(savedUser),
        token
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during account creation'
    });
  }
});

// @route   POST /api/auth/signin
// @desc    Authenticate user & get token
// @access  Public
router.post('/signin', validateSignin, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = findUserByEmail(email);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated. Please contact support.'
      });
    }

    // Check password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    user.lastLogin = new Date();

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Signed in successfully!',
      data: {
        user: getPublicProfile(user),
        token
      }
    });

  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during sign in'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = findUserById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        user: getPublicProfile(user)
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    console.log('Profile update request received');
    console.log('Request body:', req.body);
    console.log('User ID from token:', req.user.userId);
    
    const { name, email, phone, address, city, state, zipCode } = req.body;
    const userId = req.user.userId;

    // Find user
    const user = findUserById(userId);
    console.log('User found:', user ? 'Yes' : 'No');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update user data
    console.log('Updating user with data:', {
      name: name || user.name,
      email: email || user.email,
      phone: phone || user.phone,
      address: address || user.address,
      city: city || user.city,
      state: state || user.state,
      zipCode: zipCode || user.zipCode
    });
    
    const updatedUser = updateUser(userId, {
      name: name || user.name,
      email: email || user.email,
      phone: phone || user.phone,
      address: address || user.address,
      city: city || user.city,
      state: state || user.state,
      zipCode: zipCode || user.zipCode,
      updatedAt: new Date()
    });

    console.log('Update result:', updatedUser ? 'Success' : 'Failed');
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: getPublicProfile(updatedUser)
      }
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during profile update'
    });
  }
});

// @route   GET /api/auth/orders
// @desc    Get user orders
// @access  Private
router.get('/orders', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find user
    const user = findUserById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Mock orders data - in a real app, this would come from a database
    const orders = [
      {
        id: 'ORD-001',
        userId: userId,
        date: '2025-01-15',
        status: 'delivered',
        total: 45.99,
        items: [
          { name: 'Orange Juice', quantity: 2, price: 12.99 },
          { name: 'Apple Juice', quantity: 1, price: 10.99 },
          { name: 'Berry Mix', quantity: 1, price: 11.02 }
        ]
      },
      {
        id: 'ORD-002',
        userId: userId,
        date: '2025-01-20',
        status: 'in-progress',
        total: 32.97,
        items: [
          { name: 'Green Detox', quantity: 2, price: 14.99 },
          { name: 'Carrot Juice', quantity: 1, price: 2.99 }
        ]
      },
      {
        id: 'ORD-003',
        userId: userId,
        date: '2025-01-25',
        status: 'processing',
        total: 28.98,
        items: [
          { name: 'Pomegranate Juice', quantity: 2, price: 14.49 }
        ]
      }
    ];

    res.json({
      success: true,
      data: {
        orders
      }
    });

  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders'
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user (client-side token removal)
// @access  Private
router.post('/logout', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router; 