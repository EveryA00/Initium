import { createShipment, createShippingLabel, formatOrderForShipStation } from '../../../utils/shipstationService';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { orderId, shippingMethod, customerAddress, orderData } = req.body;

    // Format order data for ShipStation
    const shipstationOrderData = formatOrderForShipStation(orderData);

    // Create shipment in ShipStation
    const shipment = await createShipment(shipstationOrderData);

    // Create shipping label
    const labelData = {
      labelFormat: 'pdf',
      labelLayout: '4x6',
      validateAddress: 'no_validation'
    };

    const label = await createShippingLabel(shipment.shipmentId, labelData);

    // Format the response
    const shippingLabel = {
      orderId,
      trackingNumber: label.trackingNumber,
      carrier: label.carrierCode,
      service: label.serviceCode,
      labelUrl: label.labelData, // Base64 encoded PDF
      estimatedDelivery: new Date(Date.now() + 
        (shippingMethod === 'overnight' ? 1 : 
         shippingMethod === 'express' ? 3 : 7) * 24 * 60 * 60 * 1000),
      cost: label.shipmentCost,
      fromAddress: {
        name: 'Your Store Name',
        address: '123 Store Street',
        city: 'Your City',
        state: 'ST',
        zipCode: '12345',
        country: 'US'
      },
      toAddress: customerAddress,
      shipmentId: shipment.shipmentId
    };

    res.status(200).json({
      success: true,
      shippingLabel,
      message: 'Shipping label generated successfully via ShipStation'
    });

  } catch (error) {
    console.error('Shipping label generation error:', error);
    
    // Fallback to mock label if ShipStation fails
    const trackingNumber = `TRK${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    
    const fallbackLabel = {
      orderId: req.body.orderId,
      trackingNumber,
      carrier: req.body.shippingMethod === 'overnight' ? 'FedEx' : 'USPS',
      service: req.body.shippingMethod === 'overnight' ? 'Priority Overnight' : 
               req.body.shippingMethod === 'express' ? 'Priority Express' : 'Ground',
      labelUrl: `https://example.com/labels/${trackingNumber}.pdf`,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      cost: req.body.shippingMethod === 'overnight' ? 25.99 :
            req.body.shippingMethod === 'express' ? 15.99 : 5.99,
      fromAddress: {
        name: 'Your Store Name',
        address: '123 Store Street',
        city: 'Your City',
        state: 'ST',
        zipCode: '12345',
        country: 'US'
      },
      toAddress: req.body.customerAddress
    };

    res.status(200).json({
      success: true,
      shippingLabel: fallbackLabel,
      message: 'Mock shipping label generated (ShipStation API error)'
    });
  }
}
