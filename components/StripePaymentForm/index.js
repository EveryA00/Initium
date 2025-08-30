import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styled from 'styled-components';

const PaymentFormContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const CardElementContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.surface};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.fontSizeSmall};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const SuccessMessage = styled.div`
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.typography.fontSizeSmall};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#1B3D1A',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      '::placeholder': {
        color: '#2E5A27',
      },
    },
    invalid: {
      color: '#F44336',
    },
  },
};

const StripePaymentForm = ({ amount, onPaymentSuccess, onPaymentError, isProcessing, validateForm }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Pay button clicked!');
    console.log('Stripe object:', stripe);
    console.log('Elements object:', elements);

    if (!stripe || !elements) {
      console.log('Stripe or Elements not loaded');
      return;
    }

    // Validate form if validation function is provided
    if (validateForm && !validateForm()) {
      console.log('Form validation failed');
      setError('Please fill in all required fields correctly.');
      return;
    }

    console.log('Starting payment process...');
    setError(null);
    setSuccess(false);

    // Create payment method
    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (paymentMethodError) {
      setError(paymentMethodError.message);
      onPaymentError?.(paymentMethodError);
      return;
    }

    try {
      // Send payment method to your server
      const response = await fetch('/api/payments/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: amount, // Amount in cents
        }),
      });

      const result = await response.json();

      if (result.error) {
        setError(result.error);
        onPaymentError?.(result.error);
      } else {
        setSuccess(true);
        onPaymentSuccess?.(result);
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
      onPaymentError?.(err);
    }
  };

  return (
    <PaymentFormContainer>
      <CardElementContainer>
        <CardElement options={cardElementOptions} />
      </CardElementContainer>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>Payment successful!</SuccessMessage>}
      
      <button
        type="button"
        disabled={!stripe || isProcessing}
        onClick={handleSubmit}
        style={{
          width: '100%',
          padding: '12px 24px',
          backgroundColor: '#2E5A27',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: isProcessing ? 'not-allowed' : 'pointer',
          opacity: isProcessing ? 0.6 : 1,
        }}
      >
        {isProcessing ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
      </button>
    </PaymentFormContainer>
  );
};

export default StripePaymentForm;
