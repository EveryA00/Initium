import Order from '../../../models/Order';
import connectDB from '../../../config/database';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { page = 1, limit = 10, status, email } = req.query;
    const skip = (page - 1) * limit;

    // Build query
    let query = {};
    if (status) query.status = status;
    if (email) query['customer.email'] = email;

    // Get orders with pagination
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Get total count
    const total = await Order.countDocuments(query);

    res.status(200).json({
      success: true,
      orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Orders retrieval error:', error);
    res.status(500).json({
      error: 'Failed to retrieve orders',
      details: error.message,
    });
  }
}
