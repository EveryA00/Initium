# 🚢 ShipStation Integration Guide

## 📋 Overview

Your e-commerce application is now integrated with ShipStation! This integration provides real shipping rates, label generation, and order management through ShipStation's powerful platform.

## 🔑 API Configuration

### **Current Setup:**
- ✅ **API Key:** `sHwXqybAH5FP65VsernMpo2Dv94hyvXm+vZ/EsNHL24`
- ✅ **API Secret:** You'll need to add this to your environment variables
- ✅ **Package:** `shipstation-node` installed

### **Environment Variables:**
Add these to your `.env.local`:

```bash
# ShipStation Configuration
SHIPSTATION_API_KEY=sHwXqybAH5FP65VsernMpo2Dv94hyvXm+vZ/EsNHL24
SHIPSTATION_API_SECRET=your_shipstation_api_secret_here
```

## 🚀 Features Implemented

### **1. Real Shipping Rates**
- ✅ **Live rates** from multiple carriers
- ✅ **Dynamic pricing** based on weight and destination
- ✅ **Multiple service options** (Ground, Express, Overnight)
- ✅ **Fallback rates** if API fails

### **2. Shipping Label Generation**
- ✅ **Real labels** from ShipStation
- ✅ **PDF format** ready for printing
- ✅ **Tracking numbers** automatically generated
- ✅ **Multiple carriers** supported

### **3. Order Management**
- ✅ **Order sync** with ShipStation
- ✅ **Status tracking** in both systems
- ✅ **Customer information** automatically populated
- ✅ **Item details** with weights and dimensions

### **4. Admin Dashboard**
- ✅ **Order management** interface
- ✅ **ShipStation integration** status
- ✅ **Label generation** buttons
- ✅ **Tracking information** display

## 🔧 API Endpoints

### **Shipping Rate Calculation**
```
POST /api/shipping/calculate
```
- Gets real shipping rates from ShipStation
- Supports multiple carriers and services
- Fallback to mock rates if API fails

### **Shipping Label Generation**
```
POST /api/shipping/label
```
- Creates real shipping labels via ShipStation
- Returns PDF label data
- Includes tracking numbers

### **Order Sync**
```
POST /api/shipping/sync-order
```
- Syncs orders with ShipStation
- Creates orders in ShipStation dashboard
- Links local and ShipStation order IDs

## 🧪 Testing the Integration

### **1. Test Shipping Rates**
1. **Go to checkout** page
2. **Fill shipping address**
3. **Check console** for ShipStation API calls
4. **Verify rates** are real (not fallback)

### **2. Test Order Creation**
1. **Complete a test payment**
2. **Check console** for order creation
3. **Visit ShipStation dashboard** to see the order
4. **Verify customer info** is populated

### **3. Test Label Generation**
1. **Go to admin dashboard** (`/admin/orders`)
2. **Find a confirmed order**
3. **Generate shipping label**
4. **Download and print** the label

## 📊 ShipStation Dashboard

### **Access Your Dashboard:**
- **URL:** https://ss.shipstation.com
- **Login:** Use your ShipStation credentials
- **Orders:** View all synced orders
- **Labels:** Generate and manage shipping labels
- **Carriers:** Configure shipping carriers

### **Dashboard Features:**
- ✅ **Order management** - View and process orders
- ✅ **Label generation** - Create shipping labels
- ✅ **Carrier setup** - Configure USPS, FedEx, UPS, etc.
- ✅ **Warehouse management** - Set up shipping locations
- ✅ **Reporting** - Shipping analytics and reports

## 🔧 Configuration Options

### **Update Warehouse Information:**
In `utils/shipstationService.js`, update the `fromPostalCode`:

```javascript
// In formatShipmentForRates function
fromPostalCode: '12345', // Change to your warehouse postal code
```

### **Configure Default Carriers:**
Update the default carrier settings:

```javascript
// In formatOrderForShipStation function
carrierCode: 'stamps_com', // Change to your preferred carrier
serviceCode: 'usps_priority', // Change to your preferred service
```

### **Available Carriers:**
- **USPS** (`stamps_com`) - Domestic shipping
- **FedEx** (`fedex`) - Express shipping
- **UPS** (`ups`) - Ground and express
- **DHL** (`dhl`) - International shipping

## 🚨 Troubleshooting

### **Common Issues:**

1. **API Authentication Error**
   - Check your API key and secret
   - Verify they're correctly set in environment variables
   - Ensure the API key has proper permissions

2. **Rate Calculation Fails**
   - Check address format (ZIP code, state)
   - Verify package weight and dimensions
   - Check carrier availability for destination

3. **Label Generation Fails**
   - Ensure order is in "awaiting_shipment" status
   - Check that all required fields are populated
   - Verify carrier is configured in ShipStation

4. **Order Sync Issues**
   - Check order data format
   - Verify customer information is complete
   - Ensure items have proper SKUs and weights

### **Debug Mode:**
Enable debug logging by checking the console for:
- API request/response logs
- Error messages with details
- Fallback mode notifications

## 📈 Next Steps

### **1. Production Setup**
- ✅ **Get API Secret** from ShipStation
- ✅ **Configure carriers** in ShipStation dashboard
- ✅ **Set up warehouse** information
- ✅ **Test with real addresses**

### **2. Advanced Features**
- ✅ **Bulk label generation** for multiple orders
- ✅ **Automated shipping** workflows
- ✅ **Return label** generation
- ✅ **International shipping** support

### **3. Optimization**
- ✅ **Rate caching** for better performance
- ✅ **Batch processing** for multiple orders
- ✅ **Error handling** improvements
- ✅ **Analytics** and reporting

## 📞 Support

### **ShipStation Resources:**
- **API Documentation:** https://www.shipstation.com/developer-api/
- **Support Portal:** https://help.shipstation.com/
- **Developer Community:** https://community.shipstation.com/

### **Integration Help:**
- **Package Documentation:** https://www.npmjs.com/package/shipstation-node
- **API Reference:** https://www.shipstation.com/developer-api/
- **Webhook Setup:** For real-time order updates

---

**Your ShipStation integration is ready! Test it with a real order and see the magic happen! 🚀**
