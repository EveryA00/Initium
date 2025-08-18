const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://238-354-3873.com',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

// Import and use routes
const authRoutes = require('../routes/auth');
app.use('/api/auth', authRoutes);

// Products API endpoint
app.get('/api/products', async (req, res) => {
  try {
    // Sample products data
    const products = [
      {
        id: 1,
        name: "Apple Juice",
        description: "Fresh and natural apple juice",
        price: 4.99,
        image: "/images/juice/product/apple_juice.jpg",
        category: "fruit"
      },
      {
        id: 2,
        name: "Orange Juice",
        description: "Vitamin C rich orange juice",
        price: 5.99,
        image: "/images/juice/product/orange_juice.jpg",
        category: "fruit"
      },
      {
        id: 3,
        name: "Green Juice",
        description: "Healthy green vegetable juice",
        price: 6.99,
        image: "/images/juice/product/green_juice.jpg",
        category: "vegetable"
      },
      {
        id: 4,
        name: "Carrot Juice",
        description: "Nutritious carrot juice",
        price: 4.49,
        image: "/images/juice/product/carrot_juice.jpg",
        category: "vegetable"
      },
      {
        id: 5,
        name: "Blueberry Juice",
        description: "Antioxidant-rich blueberry juice",
        price: 7.99,
        image: "/images/juice/product/blueberry_BG.jpg",
        category: "fruit"
      },
      {
        id: 6,
        name: "Pomegranate Juice",
        description: "Heart-healthy pomegranate juice",
        price: 8.99,
        image: "/images/juice/product/pomegranetjuice.jpg",
        category: "fruit"
      }
    ];
    
    res.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Error fetching products' });
  }
});

// Catch-all route for API endpoints
app.all('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: 'API endpoint not found' });
});

// Export for Vercel
module.exports = app; 