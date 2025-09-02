import { getShippingRates, formatShipmentForRates } from '../../../utils/shipstationService';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { address, items, weight } = req.body;

    // Format shipment data for ShipStation
    const shipmentData = formatShipmentForRates({
      customer: {
        state: address.state,
        country: address.country,
        zipCode: address.zipCode,
        city: address.city
      },
      items: items || []
    });

    // Get real shipping rates from ShipStation
    const rates = await getShippingRates(shipmentData);

    // Format the rates for the frontend
    const shippingOptions = rates.map(rate => ({
      id: rate.serviceCode,
      name: rate.serviceName,
      cost: rate.shipmentCost,
      estimatedDays: rate.deliveryDays ? `${rate.deliveryDays} business days` : 'Varies',
      description: rate.serviceName,
      carrierCode: rate.carrierCode,
      serviceCode: rate.serviceCode
    }));

    res.status(200).json({
      success: true,
      shippingOptions,
      address: {
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        country: address.country
      }
    });

  } catch (error) {
    console.error('Shipping calculation error:', error);
    
    // Fallback to mock rates if ShipStation fails
    const baseRate = 5.99;
    const weightCost = (weight || 2) * 0.5;
    const distanceCost = 2.00;

    const fallbackOptions = [
      {
        id: 'standard',
        name: 'Standard Shipping',
        cost: baseRate + weightCost + distanceCost,
        estimatedDays: '5-7 business days',
        description: 'Standard ground shipping'
      },
      {
        id: 'express',
        name: 'Express Shipping',
        cost: (baseRate + weightCost + distanceCost) * 2.5,
        estimatedDays: '2-3 business days',
        description: 'Priority express shipping'
      },
      {
        id: 'overnight',
        name: 'Overnight Shipping',
        cost: (baseRate + weightCost + distanceCost) * 4,
        estimatedDays: '1 business day',
        description: 'Next day delivery'
      }
    ];

    res.status(200).json({
      success: true,
      shippingOptions: fallbackOptions,
      address: {
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        country: address.country
      },
      note: 'Using fallback rates due to ShipStation API error'
    });
  }
}
