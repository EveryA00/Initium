import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const ConfirmationContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ConfirmationCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  max-width: 600px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.6s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  font-size: 2.5rem;
  color: white;
  animation: bounce 0.6s ease-out;

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

const Title = styled.h1`
  color: #1f2937;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const Message = styled.p`
  color: #6b7280;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const OrderDetails = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  text-align: left;
`;

const OrderDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    font-weight: 600;
    font-size: 1.1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;

  &.primary {
    background: #3b82f6;
    color: white;

    &:hover {
      background: #2563eb;
      transform: translateY(-2px);
    }
  }

  &.secondary {
    background: #f3f4f6;
    color: #374151;

    &:hover {
      background: #e5e7eb;
      transform: translateY(-2px);
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Countdown = styled.div`
  color: #6b7280;
  font-size: 0.9rem;
  margin-top: 1rem;
`;

const OrderConfirmation = () => {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Get order details from URL params or localStorage
    const orderData = router.query;
    const storedOrder = localStorage.getItem('lastOrder');
    
    if (orderData.payment_intent || storedOrder) {
      const details = orderData.payment_intent ? {
        orderId: orderData.payment_intent,
        amount: parseFloat(orderData.amount || 0) / 100,
        orderNumber: `ORD-${Date.now()}`,
        date: new Date().toLocaleDateString(),
        status: 'Paid'
      } : JSON.parse(storedOrder);
      
      setOrderDetails(details);
    }

    // Auto-redirect countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleContinueShopping = () => {
    router.push('/productGrid');
  };

  const handleViewOrders = () => {
    router.push('/profile');
  };

  const handleDownloadReceipt = () => {
    if (!orderDetails) return;
    
    // Create a simple receipt
    const receipt = `
      ORDER RECEIPT
      =============
      
      Order Number: ${orderDetails.orderNumber}
      Date: ${orderDetails.date}
      Amount: $${orderDetails.amount.toFixed(2)}
      Status: ${orderDetails.status}
      
      Thank you for your purchase!
    `;
    
    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${orderDetails.orderNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!orderDetails) {
    return (
      <ConfirmationContainer>
        <ConfirmationCard>
          <Title>Loading...</Title>
          <Message>Retrieving your order details...</Message>
        </ConfirmationCard>
      </ConfirmationContainer>
    );
  }

  return (
    <ConfirmationContainer>
      <ConfirmationCard>
        <SuccessIcon>✓</SuccessIcon>
        <Title>Order Confirmed!</Title>
        <Message>
          Thank you for your purchase! Your order has been successfully processed and confirmed.
          You will receive an email confirmation shortly.
        </Message>

        <OrderDetails>
          <OrderDetailRow>
            <span>Order Number:</span>
            <span>{orderDetails.orderNumber}</span>
          </OrderDetailRow>
          <OrderDetailRow>
            <span>Date:</span>
            <span>{orderDetails.date}</span>
          </OrderDetailRow>
          <OrderDetailRow>
            <span>Amount:</span>
            <span>${orderDetails.amount.toFixed(2)}</span>
          </OrderDetailRow>
          <OrderDetailRow>
            <span>Status:</span>
            <span style={{ color: '#10b981' }}>{orderDetails.status}</span>
          </OrderDetailRow>
        </OrderDetails>

        <ButtonContainer>
          <Button className="primary" onClick={handleContinueShopping}>
            Continue Shopping
          </Button>
          <Button className="secondary" onClick={handleViewOrders}>
            View Orders
          </Button>
          <Button className="secondary" onClick={handleDownloadReceipt}>
            Download Receipt
          </Button>
        </ButtonContainer>

        <Countdown>
          Redirecting to home page in {countdown} seconds...
        </Countdown>
      </ConfirmationCard>
    </ConfirmationContainer>
  );
};

export default OrderConfirmation;
