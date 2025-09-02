import { createOrder, updateOrderStatus } from '../../../utils/shipstationService';
import Order from '../../../models/Order';
import connectDB from '../../../config/database';
import { formatOrderForShipStation } from '../../../utils/shipstationService';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { orderId } = req.body;

    // Get order from database
    const order = await Order.findOne({ orderId });
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Format order data for ShipStation
    const shipstationOrderData = formatOrderForShipStation(order);

    // Create order in ShipStation
    const shipstationOrder = await createOrder(shipstationOrderData);

    // Update local order with ShipStation info
    order.shipping.shipstationOrderId = shipstationOrder.orderId;
    order.shipping.shipstationOrderKey = shipstationOrder.orderKey;
    await order.save();

    console.log(`Order ${orderId} synced with ShipStation:`, shipstationOrder.orderId);

    res.status(200).json({
      success: true,
      shipstationOrderId: shipstationOrder.orderId,
      message: 'Order synced with ShipStation successfully'
    });

  } catch (error) {
    console.error('Order sync error:', error);
    res.status(500).json({
      error: 'Failed to sync order with ShipStation',
      details: error.message,
    });
  }
}
