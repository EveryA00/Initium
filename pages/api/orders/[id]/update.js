import Order from '../../../../models/Order';
import connectDB from '../../../../config/database';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { id } = req.query;
    const { status, trackingNumber, carrier, notes } = req.body;

    // Find and update the order
    const order = await Order.findById(id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update order fields
    if (status) {
      order.status = status;
    }

    if (trackingNumber) {
      order.shipping.trackingNumber = trackingNumber;
    }

    if (carrier) {
      order.shipping.carrier = carrier;
    }

    if (notes) {
      order.notes = notes;
    }

    // Update timestamp
    order.updatedAt = new Date();

    await order.save();

    console.log(`Order ${order.orderId} updated:`, { status, trackingNumber, carrier });

    res.status(200).json({
      success: true,
      order: {
        orderId: order.orderId,
        status: order.status,
        trackingNumber: order.shipping.trackingNumber,
        carrier: order.shipping.carrier,
        updatedAt: order.updatedAt
      },
      message: 'Order updated successfully'
    });

  } catch (error) {
    console.error('Order update error:', error);
    res.status(500).json({
      error: 'Failed to update order',
      details: error.message,
    });
  }
}
