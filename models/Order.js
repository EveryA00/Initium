const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  items: [{
    productId: String,
    name: String,
    price: Number,
    quantity: Number,
    image: String,
  }],
  payment: {
    stripePaymentIntentId: String,
    stripeCustomerId: String,
    amount: Number,
    currency: String,
    status: String,
  },
  shipping: {
    method: String,
    cost: Number,
    trackingNumber: String,
    carrier: String,
    estimatedDelivery: Date,
    shipstationOrderId: String,
    shipstationOrderKey: String,
    shipstationShipmentId: String,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  total: {
    subtotal: Number,
    tax: Number,
    shipping: Number,
    total: Number,
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Generate order ID
orderSchema.pre('save', function(next) {
  if (!this.orderId) {
    this.orderId = 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Order', orderSchema);
