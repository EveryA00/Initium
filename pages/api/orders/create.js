import Order from '../../../models/Order';
import connectDB from '../../../config/database';
import { sendOrderConfirmation } from '../../../utils/emailService';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    const {
      customerInfo,
      items,
      paymentInfo,
      totals,
      shippingInfo = {}
    } = req.body;

    // Create new order
    const order = new Order({
      customer: {
        name: `${customerInfo.firstName} ${customerInfo.lastName}`,
        email: customerInfo.email,
        phone: customerInfo.phone,
        address: customerInfo.address,
        city: customerInfo.city,
        state: customerInfo.state,
        zipCode: customerInfo.zipCode,
        country: customerInfo.country,
      },
      items: items.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      payment: {
        stripePaymentIntentId: paymentInfo.paymentIntentId,
        stripeCustomerId: paymentInfo.customerId,
        amount: paymentInfo.amount,
        currency: 'usd',
        status: 'succeeded',
      },
      shipping: {
        method: shippingInfo.method || 'Standard Shipping',
        cost: totals.shipping || 0,
        trackingNumber: '',
        carrier: '',
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      },
      status: 'confirmed',
      total: {
        subtotal: totals.subtotal,
        tax: totals.tax,
        shipping: totals.shipping,
        total: totals.total,
      },
    });

    await order.save();

    console.log('Order created:', order.orderId);

    // Send order confirmation email
    console.log('📧 Attempting to send order confirmation email...');
    try {
      const emailResult = await sendOrderConfirmation({
        customer: order.customer,
        items: order.items,
        orderId: order.orderId,
        total: order.total,
      });
      
      if (emailResult) {
        console.log('✅ Order confirmation email sent successfully');
      } else {
        console.log('❌ Order confirmation email failed to send');
      }
    } catch (emailError) {
      console.error('❌ Error sending order confirmation email:', emailError);
      // Don't fail the order creation if email fails
    }

    res.status(201).json({
      success: true,
      orderId: order.orderId,
      message: 'Order created successfully',
    });

  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      error: 'Failed to create order',
      details: error.message,
    });
  }
}
