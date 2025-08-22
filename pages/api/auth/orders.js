export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Mock orders data
    const mockOrders = [
      {
        id: 'ORD-001',
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
        date: '2025-01-25',
        status: 'processing',
        total: 28.98,
        items: [
          { name: 'Pomegranate Juice', quantity: 2, price: 14.49 }
        ]
      }
    ];

    return res.status(200).json({
      success: true,
      data: {
        orders: mockOrders
      }
    });
  } catch (error) {
    console.error('Orders error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
} 