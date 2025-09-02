import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #2E5A27;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 600;
`;

const OrderGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const OrderCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f3f4f6;
`;

const OrderId = styled.h3`
  color: #2E5A27;
  font-weight: 600;
  margin: 0;
`;

const Status = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background: ${props => {
    switch (props.status) {
      case 'confirmed': return '#dbeafe';
      case 'processing': return '#fef3c7';
      case 'shipped': return '#d1fae5';
      case 'delivered': return '#dcfce7';
      case 'cancelled': return '#fee2e2';
      default: return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'confirmed': return '#1e40af';
      case 'processing': return '#92400e';
      case 'shipped': return '#065f46';
      case 'delivered': return '#166534';
      case 'cancelled': return '#991b1b';
      default: return '#374151';
    }
  }};
`;

const CustomerInfo = styled.div`
  margin-bottom: 1rem;
`;

const CustomerName = styled.div`
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.25rem;
`;

const CustomerEmail = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
`;

const ItemsList = styled.div`
  margin-bottom: 1rem;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f9fafb;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemName = styled.span`
  font-weight: 500;
`;

const ItemQuantity = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
`;

const Total = styled.div`
  text-align: right;
  font-weight: 600;
  color: #2E5A27;
  font-size: 1.125rem;
`;

const Date = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const Loading = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`;

const Error = styled.div`
  text-align: center;
  padding: 2rem;
  color: #dc2626;
`;

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.orders);
      } else {
        setError('Failed to fetch orders');
      }
    } catch (err) {
      setError('Error fetching orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <Title>Order Management</Title>
        <Loading>Loading orders...</Loading>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Title>Order Management</Title>
        <Error>{error}</Error>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Order Management</Title>
      
      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
          No orders found
        </div>
      ) : (
        <OrderGrid>
          {orders.map((order) => (
            <OrderCard key={order._id}>
              <OrderHeader>
                <OrderId>{order.orderId}</OrderId>
                <Status status={order.status}>{order.status}</Status>
              </OrderHeader>
              
              <CustomerInfo>
                <CustomerName>{order.customer.name}</CustomerName>
                <CustomerEmail>{order.customer.email}</CustomerEmail>
              </CustomerInfo>
              
              <ItemsList>
                {order.items.map((item, index) => (
                  <Item key={index}>
                    <ItemName>{item.name}</ItemName>
                    <ItemQuantity>Qty: {item.quantity}</ItemQuantity>
                  </Item>
                ))}
              </ItemsList>
              
              <Total>Total: ${(order.total.total / 100).toFixed(2)}</Total>
              <Date>Ordered: {new Date(order.createdAt).toLocaleDateString()}</Date>
            </OrderCard>
          ))}
        </OrderGrid>
      )}
    </Container>
  );
}
