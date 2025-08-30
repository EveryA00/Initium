import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { paymentMethodId, amount, customerInfo } = req.body;

    // Validate required fields
    if (!paymentMethodId || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a PaymentIntent with the payment method
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
      metadata: {
        customer_email: customerInfo?.email,
        customer_name: `${customerInfo?.firstName} ${customerInfo?.lastName}`,
      },
    });

    // Return the payment intent status
    res.status(200).json({
      success: true,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
    });

  } catch (error) {
    console.error('Payment error:', error);
    
    // Handle specific Stripe errors
    if (error.type === 'StripeCardError') {
      return res.status(400).json({ 
        error: error.message || 'Your card was declined.' 
      });
    } else if (error.type === 'StripeRateLimitError') {
      return res.status(429).json({ 
        error: 'Too many requests made to the API too quickly.' 
      });
    } else if (error.type === 'StripeInvalidRequestError') {
      return res.status(400).json({ 
        error: 'Invalid parameters were supplied to Stripe\'s API.' 
      });
    } else if (error.type === 'StripeAPIError') {
      return res.status(500).json({ 
        error: 'An error occurred internally with Stripe\'s API.' 
      });
    } else if (error.type === 'StripeConnectionError') {
      return res.status(500).json({ 
        error: 'Some kind of error occurred during the HTTPS communication.' 
      });
    } else if (error.type === 'StripeAuthenticationError') {
      return res.status(401).json({ 
        error: 'You probably used an incorrect API key.' 
      });
    } else {
      return res.status(500).json({ 
        error: 'An unexpected error occurred.' 
      });
    }
  }
}
