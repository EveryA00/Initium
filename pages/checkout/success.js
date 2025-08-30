import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const SuccessContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  padding-top: calc(80px + ${({ theme }) => theme.spacing.xl});
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.success}, #45a049);
  border-radius: 50%;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;
  animation: scaleIn 0.6s ease-out;
  
  @keyframes scaleIn {
    from {
      transform: scale(0);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.h2};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-weight: ${({ theme }) => theme.typography.bold};
`;

const Message = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizeLarge};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.6;
`;

const OrderDetails = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.borderLight} 0%, ${({ theme }) => theme.colors.surface} 100%);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: left;
`;

const OrderDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  
  &:last-child {
    border-bottom: none;
    font-weight: ${({ theme }) => theme.typography.bold};
    font-size: ${({ theme }) => theme.typography.fontSizeLarge};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.fontSizeLarge};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  color: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.typography.semibold};
  transition: all ${({ theme }) => theme.transitions.fast};
  margin: ${({ theme }) => theme.spacing.md};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
  
  &.secondary {
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.surface};
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const Success = () => {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Get order details from URL params or localStorage
    const paymentIntentId = router.query.payment_intent;
    const amount = router.query.amount;
    
    if (paymentIntentId && amount) {
      setOrderDetails({
        paymentIntentId,
        amount: parseFloat(amount) / 100, // Convert from cents
        orderNumber: `ORD-${Date.now()}`,
        date: new Date().toLocaleDateString(),
      });
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

  return (
    <SuccessContainer>
      <SuccessIcon>✓</SuccessIcon>
      
      <Title>Payment Successful!</Title>
      
      <Message>
        Thank you for your order! Your payment has been processed successfully. 
        You will receive a confirmation email shortly with your order details.
      </Message>

      {orderDetails && (
        <OrderDetails>
          <h3>Order Summary</h3>
          <OrderDetailRow>
            <span>Order Number:</span>
            <span>{orderDetails.orderNumber}</span>
          </OrderDetailRow>
          <OrderDetailRow>
            <span>Payment ID:</span>
            <span>{orderDetails.paymentIntentId}</span>
          </OrderDetailRow>
          <OrderDetailRow>
            <span>Date:</span>
            <span>{orderDetails.date}</span>
          </OrderDetailRow>
          <OrderDetailRow>
            <span>Total Amount:</span>
            <span>${orderDetails.amount.toFixed(2)}</span>
          </OrderDetailRow>
        </OrderDetails>
      )}

      <Message>
        Redirecting to home page in {countdown} seconds...
      </Message>

      <ButtonContainer>
        <Button onClick={handleContinueShopping}>
          Continue Shopping
        </Button>
        <Button className="secondary" onClick={handleViewOrders}>
          View Orders
        </Button>
      </ButtonContainer>
    </SuccessContainer>
  );
};

export default Success;
