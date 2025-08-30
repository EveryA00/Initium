# Stripe Payment Integration Setup Guide

This guide will help you set up Stripe payments for your juice store checkout page.

## 🚀 Quick Setup

### 1. Create a Stripe Account
1. Go to [stripe.com](https://stripe.com) and sign up for a free account
2. Complete your business verification
3. Get your API keys from the Stripe Dashboard

### 2. Environment Variables Setup
Create a `.env.local` file in your project root with the following variables:

```bash
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Application Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Database Configuration (if using)
MONGODB_URI=your_mongodb_connection_string_here

# Other Configuration
NODE_ENV=development
```

### 3. Get Your Stripe API Keys
1. Log into your [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to **Developers** → **API keys**
3. Copy your **Publishable key** and **Secret key**
4. Replace the placeholder values in your `.env.local` file

## 🔧 Configuration Details

### Test vs Live Keys
- **Test Keys**: Start with `pk_test_` and `sk_test_` (for development)
- **Live Keys**: Start with `pk_live_` and `sk_live_` (for production)

### Environment Variables Explained
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Used in the browser (safe to expose)
- `STRIPE_SECRET_KEY`: Used only on the server (keep secret!)
- `NEXT_PUBLIC_BASE_URL`: Your website URL for redirects

## 🧪 Testing Your Integration

### Test Card Numbers
Use these test card numbers to test your payment flow:

| Card Type | Number | Expiry | CVC |
|-----------|--------|--------|-----|
| Visa | 4242 4242 4242 4242 | Any future date | Any 3 digits |
| Mastercard | 5555 5555 5555 4444 | Any future date | Any 3 digits |
| American Express | 3782 822463 10005 | Any future date | Any 4 digits |

### Test Scenarios
- **Successful Payment**: Use any of the above cards
- **Declined Payment**: Use `4000 0000 0000 0002`
- **Insufficient Funds**: Use `4000 0000 0000 9995`
- **Expired Card**: Use `4000 0000 0000 0069`

## 🛡️ Security Best Practices

### 1. Never Expose Secret Keys
- Keep `STRIPE_SECRET_KEY` server-side only
- Never log or display secret keys
- Use environment variables for all sensitive data

### 2. Validate Payments Server-Side
- Always verify payments on your server
- Don't rely on client-side validation alone
- Use webhooks for payment confirmations

### 3. Handle Errors Gracefully
- Implement proper error handling
- Show user-friendly error messages
- Log errors for debugging

## 📱 Additional Payment Methods

### Apple Pay & Google Pay
Stripe automatically supports Apple Pay and Google Pay when available:

```javascript
// In your StripePaymentForm component
const { error, paymentMethod } = await stripe.createPaymentMethod({
  type: 'card',
  card: elements.getElement(CardElement),
  billing_details: {
    name: customerName,
    email: customerEmail,
  },
});
```

### Shop Pay
To enable Shop Pay, you'll need to:
1. Contact Stripe support to enable Shop Pay
2. Complete additional verification
3. Add Shop Pay branding to your checkout

## 🔄 Webhook Setup (Recommended)

Set up webhooks to handle payment confirmations:

1. Go to **Developers** → **Webhooks** in Stripe Dashboard
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`

### Webhook Endpoint Example
```javascript
// pages/api/webhooks/stripe.js
import Stripe from 'stripe';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Handle successful payment
      console.log('Payment succeeded:', paymentIntent.id);
      break;
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      // Handle failed payment
      console.log('Payment failed:', failedPayment.id);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
}
```

## 🚀 Going Live

### 1. Switch to Live Keys
1. Replace test keys with live keys in your environment variables
2. Update `NEXT_PUBLIC_BASE_URL` to your production domain
3. Test thoroughly with small amounts first

### 2. Compliance Requirements
- Ensure PCI compliance (Stripe handles most of this)
- Display proper terms and privacy policy
- Include refund policy information
- Add proper business contact information

### 3. Monitoring
- Set up Stripe Dashboard alerts
- Monitor payment success rates
- Track chargeback rates
- Review failed payments regularly

## 🆘 Troubleshooting

### Common Issues

#### "Invalid API Key"
- Check that your API keys are correct
- Ensure you're using the right environment (test vs live)
- Verify the keys are properly set in environment variables

#### "Payment Method Not Supported"
- Ensure your Stripe account is properly configured
- Check that the card type is supported in your region
- Verify your business verification is complete

#### "Webhook Errors"
- Check webhook endpoint URL is accessible
- Verify webhook secret is correct
- Ensure proper error handling in webhook endpoint

### Getting Help
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com)
- [Stripe Community](https://community.stripe.com)

## 📊 Analytics & Reporting

### Stripe Dashboard Features
- **Payments**: View all transactions
- **Analytics**: Track revenue, conversion rates
- **Customers**: Manage customer data
- **Disputes**: Handle chargebacks
- **Reports**: Generate financial reports

### Integration with Your App
Consider tracking:
- Payment success rates
- Average order value
- Customer lifetime value
- Payment method preferences
- Geographic payment patterns

## 🔐 Security Checklist

- [ ] Environment variables properly configured
- [ ] Secret keys never exposed to client
- [ ] HTTPS enabled in production
- [ ] Webhook signature verification implemented
- [ ] Error handling for all payment scenarios
- [ ] PCI compliance requirements met
- [ ] Regular security audits scheduled

## 🎉 Next Steps

1. **Test thoroughly** with test cards
2. **Set up webhooks** for payment confirmations
3. **Configure monitoring** and alerts
4. **Plan for scaling** as your business grows
5. **Consider additional features** like subscriptions or saved cards

Your Stripe integration is now ready to process real payments! 🚀
