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

    // Create or find a Stripe customer
    let customer;
    try {
      // Try to find existing customer by email
      const existingCustomers = await stripe.customers.list({
        email: customerInfo?.email,
        limit: 1,
      });

      if (existingCustomers.data.length > 0) {
        // Use existing customer
        customer = existingCustomers.data[0];
        console.log('Found existing customer:', customer.id);
      } else {
        // Create new customer
        customer = await stripe.customers.create({
          email: customerInfo?.email,
          name: `${customerInfo?.firstName} ${customerInfo?.lastName}`,
          phone: customerInfo?.phone,
          address: {
            line1: customerInfo?.address,
            city: customerInfo?.city,
            state: customerInfo?.state,
            postal_code: customerInfo?.zipCode,
            country: customerInfo?.country,
          },
          metadata: {
            source: 'checkout_form',
            first_name: customerInfo?.firstName,
            last_name: customerInfo?.lastName,
          },
        });
        console.log('Created new customer:', customer.id);
      }
    } catch (customerError) {
      console.error('Customer creation error:', customerError);
      // Continue without customer if there's an error
      customer = null;
    }

    // Attach payment method to customer if customer exists
    if (customer) {
      try {
        await stripe.paymentMethods.attach(paymentMethodId, {
          customer: customer.id,
        });
        console.log('Payment method attached to customer');
      } catch (attachError) {
        console.error('Payment method attachment error:', attachError);
        // Continue without attaching if there's an error
      }
    }

    // Create a PaymentIntent with the payment method and customer
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: 'usd',
      payment_method: paymentMethodId,
      customer: customer?.id, // Link to customer if exists
      confirm: true,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
      metadata: {
        customer_email: customerInfo?.email,
        customer_name: `${customerInfo?.firstName} ${customerInfo?.lastName}`,
        customer_phone: customerInfo?.phone,
        shipping_address: customerInfo?.address,
        shipping_city: customerInfo?.city,
        shipping_state: customerInfo?.state,
        shipping_zip: customerInfo?.zipCode,
        shipping_country: customerInfo?.country,
        customer_id: customer?.id || 'none', // Track if customer was created
      },
    });

    // Return the payment intent status
    res.status(200).json({
      success: true,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      customerId: customer?.id,
      customerEmail: customerInfo?.email,
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
