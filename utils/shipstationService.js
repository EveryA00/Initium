import ShipStation from 'shipstation-node';

// Initialize ShipStation client
const shipstation = new ShipStation({
  apiKey: process.env.SHIPSTATION_API_KEY || 'sHwXqybAH5FP65VsernMpo2Dv94hyvXm+vZ/EsNHL24',
  apiSecret: process.env.SHIPSTATION_API_SECRET || 'your_shipstation_api_secret_here'
});

// Get available carriers
export const getCarriers = async () => {
  try {
    const carriers = await shipstation.carriers.list();
    return carriers;
  } catch (error) {
    console.error('Error fetching carriers:', error);
    throw error;
  }
};

// Get shipping rates
export const getShippingRates = async (shipmentData) => {
  try {
    const rates = await shipstation.shipments.getRates(shipmentData);
    return rates;
  } catch (error) {
    console.error('Error getting shipping rates:', error);
    throw error;
  }
};

// Create a shipment
export const createShipment = async (orderData) => {
  try {
    const shipment = await shipstation.shipments.create(orderData);
    return shipment;
  } catch (error) {
    console.error('Error creating shipment:', error);
    throw error;
  }
};

// Get shipment by ID
export const getShipment = async (shipmentId) => {
  try {
    const shipment = await shipstation.shipments.get(shipmentId);
    return shipment;
  } catch (error) {
    console.error('Error getting shipment:', error);
    throw error;
  }
};

// Create a shipping label
export const createShippingLabel = async (shipmentId, labelData) => {
  try {
    const label = await shipstation.shipments.createLabel(shipmentId, labelData);
    return label;
  } catch (error) {
    console.error('Error creating shipping label:', error);
    throw error;
  }
};

// Track a shipment
export const trackShipment = async (trackingNumber, carrierCode) => {
  try {
    const tracking = await shipstation.tracking.get(trackingNumber, carrierCode);
    return tracking;
  } catch (error) {
    console.error('Error tracking shipment:', error);
    throw error;
  }
};

// Get warehouses
export const getWarehouses = async () => {
  try {
    const warehouses = await shipstation.warehouses.list();
    return warehouses;
  } catch (error) {
    console.error('Error fetching warehouses:', error);
    throw error;
  }
};

// Create an order in ShipStation
export const createOrder = async (orderData) => {
  try {
    const order = await shipstation.orders.create(orderData);
    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Get orders
export const getOrders = async (params = {}) => {
  try {
    const orders = await shipstation.orders.list(params);
    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Update order status
export const updateOrderStatus = async (orderId, status) => {
  try {
    const order = await shipstation.orders.update(orderId, { orderStatus: status });
    return order;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// Helper function to format order data for ShipStation
export const formatOrderForShipStation = (orderData) => {
  return {
    orderNumber: orderData.orderId,
    orderDate: new Date().toISOString(),
    orderStatus: 'awaiting_shipment',
    customerEmail: orderData.customer.email,
    customerUsername: orderData.customer.name,
    billTo: {
      name: orderData.customer.name,
      company: '',
      street1: orderData.customer.address,
      street2: '',
      city: orderData.customer.city,
      state: orderData.customer.state,
      postalCode: orderData.customer.zipCode,
      country: orderData.customer.country,
      phone: orderData.customer.phone
    },
    shipTo: {
      name: orderData.customer.name,
      company: '',
      street1: orderData.customer.address,
      street2: '',
      city: orderData.customer.city,
      state: orderData.customer.state,
      postalCode: orderData.customer.zipCode,
      country: orderData.customer.country,
      phone: orderData.customer.phone
    },
    items: orderData.items.map(item => ({
      lineItemKey: item.productId,
      sku: item.productId,
      name: item.name,
      imageUrl: item.image,
      weight: {
        value: 1, // Default weight in pounds
        units: 'pounds'
      },
      quantity: item.quantity,
      unitPrice: item.price / 100 // Convert from cents to dollars
    })),
    amountPaid: orderData.total.total / 100, // Convert from cents to dollars
    taxAmount: orderData.total.tax / 100,
    shippingAmount: orderData.total.shipping / 100,
    customerNotes: '',
    internalNotes: '',
    gift: false,
    giftMessage: '',
    paymentMethod: 'credit_card',
    requestedShippingService: 'Standard',
    carrierCode: 'stamps_com',
    serviceCode: 'usps_priority',
    packageCode: 'package',
    confirmation: 'delivery',
    warehouseId: null,
    voided: false,
    voidedDate: null,
    marketplaceNotified: false,
    notifyCustomer: false,
    holdLocation: null,
    isReturnLabel: false,
    batchDetails: null,
    tagIds: null,
    userId: null,
    externallyFulfilled: false,
    labelMessages: null
  };
};

// Helper function to format shipment data for rates
export const formatShipmentForRates = (orderData) => {
  return {
    carrierCode: 'stamps_com',
    serviceCode: 'usps_priority',
    packageCode: 'package',
    fromPostalCode: '12345', // Your warehouse postal code
    toState: orderData.customer.state,
    toCountry: orderData.customer.country,
    toPostalCode: orderData.customer.zipCode,
    toCity: orderData.customer.city,
    weight: {
      value: orderData.items.reduce((total, item) => total + (item.weight || 1) * item.quantity, 0),
      units: 'pounds'
    },
    dimension: {
      length: 12,
      width: 12,
      height: 12,
      units: 'inches'
    },
    confirmation: 'delivery',
    residential: true
  };
};
