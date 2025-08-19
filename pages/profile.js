import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  ProfileHeader,
  ProfileTabs,
  TabButton,
  TabContent,
  OrderCard,
  OrderStatus,
  AccountForm,
  FormGroup,
  Input,
  Button,
  Section,
  SectionTitle,
  OrderGrid,
  EmptyState,
  LoadingSpinner,
  Alert,
  StatsGrid,
  StatCard,
  OrderDetails,
  ProductList,
  ProductItem,
  StatusBadge,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CloseButton
} from '../styles/profileStyledComponents';

const Profile = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('orders');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [accountForm, setAccountForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [alert, setAlert] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (!token || !userData) {
        router.push('/signIn');
        return;
      }

      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setAccountForm({
          name: parsedUser.name || '',
          email: parsedUser.email || '',
          phone: parsedUser.phone || '',
          address: parsedUser.address || '',
          city: parsedUser.city || '',
          state: parsedUser.state || '',
          zipCode: parsedUser.zipCode || ''
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
        router.push('/signIn');
        return;
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  // Load orders from API
  useEffect(() => {
    const loadOrders = async () => {
      if (user) {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('/api/auth/orders', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            setOrders(data.data.orders);
          } else {
            console.error('Failed to load orders');
            // Fallback to mock data for demo
            setOrders([
              {
                id: 'ORD-001',
                date: '2025-01-15',
                status: 'delivered',
                total: 45.99,
                items: [
                  { name: 'Orange Juice', quantity: 2, price: 12.99 },
                  { name: 'Apple Juice', quantity: 1, price: 10.99 },
                  { name: 'Berry Mix', quantity: 1, price: 11.02 }
                ]
              },
              {
                id: 'ORD-002',
                date: '2025-01-20',
                status: 'in-progress',
                total: 32.97,
                items: [
                  { name: 'Green Detox', quantity: 2, price: 14.99 },
                  { name: 'Carrot Juice', quantity: 1, price: 2.99 }
                ]
              },
              {
                id: 'ORD-003',
                date: '2025-01-25',
                status: 'processing',
                total: 28.98,
                items: [
                  { name: 'Pomegranate Juice', quantity: 2, price: 14.49 }
                ]
              }
            ]);
          }
        } catch (error) {
          console.error('Error loading orders:', error);
          // Fallback to mock data for demo
          setOrders([
            {
              id: 'ORD-001',
              date: '2025-01-15',
              status: 'delivered',
              total: 45.99,
              items: [
                { name: 'Orange Juice', quantity: 2, price: 12.99 },
                { name: 'Apple Juice', quantity: 1, price: 10.99 },
                { name: 'Berry Mix', quantity: 1, price: 11.02 }
              ]
            }
          ]);
        }
      }
    };

    loadOrders();
  }, [user]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveAccount = async () => {
    console.log('Save button clicked!');
    console.log('Account form data:', accountForm);
    setIsSaving(true);
    
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token ? 'Present' : 'Missing');
      console.log('Token value:', token);
      
      if (!token) {
        throw new Error('No authentication token found. Please sign in again.');
      }
      
      const requestBody = JSON.stringify(accountForm);
      console.log('Request body:', requestBody);
      
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: requestBody
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/signIn');
          throw new Error('Session expired. Please sign in again.');
        } else if (response.status === 404) {
          // User not found (token references non-existent user)
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/signIn');
          throw new Error('User account not found. Please sign in again.');
        } else {
          throw new Error(data.message || 'Failed to update profile');
        }
      }

      // Update local storage with new user data
      const updatedUser = { ...user, ...data.data.user };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      setAlert({
        type: 'success',
        message: 'Account information updated successfully!'
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving account:', error);
      setAlert({
        type: 'error',
        message: error.message || 'Failed to update account information. Please try again.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return '#38A169';
      case 'in-progress': return '#3182CE';
      case 'processing': return '#D97706';
      case 'cancelled': return '#DC2626';
      default: return '#718096';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'in-progress': return 'In Progress';
      case 'processing': return 'Processing';
      case 'cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'orders') return true;
    if (activeTab === 'in-progress') return order.status === 'in-progress';
    if (activeTab === 'delivered') return order.status === 'delivered';
    return true;
  });

  const stats = {
    totalOrders: orders.length,
    inProgress: orders.filter(o => o.status === 'in-progress').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    totalSpent: orders.reduce((sum, order) => sum + order.total, 0)
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingSpinner>Loading your profile...</LoadingSpinner>
      </Container>
    );
  }

  if (!user) {
    return null; // Will redirect to sign in
  }

  return (
    <Container>
      {alert && (
        <Alert type={alert.type} onClick={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      <ProfileHeader>
        <div>
          <h1>Welcome back, {user.name}!</h1>
          <p>Manage your account, view orders, and update your information.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button 
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              router.push('/signIn');
            }} 
            variant="outline"
            style={{ background: '#f0f0f0', color: '#666' }}
          >
          🔄 Refresh Session
          </Button>
          <Button onClick={handleLogout} variant="outline">
            🚪 Sign Out
          </Button>
        </div>
      </ProfileHeader>

      <StatsGrid>
        <StatCard>
          <h3>{stats.totalOrders}</h3>
          <p>Total Orders</p>
        </StatCard>
        <StatCard>
          <h3>{stats.inProgress}</h3>
          <p>In Progress</p>
        </StatCard>
        <StatCard>
          <h3>{stats.delivered}</h3>
          <p>Delivered</p>
        </StatCard>
        <StatCard>
          <h3>${stats.totalSpent.toFixed(2)}</h3>
          <p>Total Spent</p>
        </StatCard>
      </StatsGrid>

      <ProfileTabs>
        <TabButton 
          active={activeTab === 'orders'} 
          onClick={() => handleTabChange('orders')}
        >
          All Orders
        </TabButton>
        <TabButton 
          active={activeTab === 'in-progress'} 
          onClick={() => handleTabChange('in-progress')}
        >
          In Progress
        </TabButton>
        <TabButton 
          active={activeTab === 'delivered'} 
          onClick={() => handleTabChange('delivered')}
        >
          Delivered
        </TabButton>
        <TabButton 
          active={activeTab === 'account'} 
          onClick={() => handleTabChange('account')}
        >
          Account
        </TabButton>
      </ProfileTabs>

      <TabContent>
        {activeTab === 'account' ? (
          <Section>
            <SectionTitle>
              Account Information
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  ✏️ Edit
                </Button>
              )}
            </SectionTitle>
            
            <AccountForm onSubmit={(e) => {
              e.preventDefault();
              if (isEditing) {
                handleSaveAccount();
              }
            }}>
              <FormGroup>
                <label>Full Name</label>
                <Input
                  type="text"
                  name="name"
                  value={accountForm.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </FormGroup>
              
              <FormGroup>
                <label>Email Address</label>
                <Input
                  type="email"
                  name="email"
                  value={accountForm.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </FormGroup>
              
              <FormGroup>
                <label>Phone Number</label>
                <Input
                  type="tel"
                  name="phone"
                  value={accountForm.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </FormGroup>
              
              <FormGroup>
                <label>Address</label>
                <Input
                  type="text"
                  name="address"
                  value={accountForm.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </FormGroup>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <FormGroup>
                  <label>City</label>
                  <Input
                    type="text"
                    name="city"
                    value={accountForm.city}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </FormGroup>
                
                <FormGroup>
                  <label>State</label>
                  <Input
                    type="text"
                    name="state"
                    value={accountForm.state}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </FormGroup>
                
                <FormGroup>
                  <label>ZIP Code</label>
                  <Input
                    type="text"
                    name="zipCode"
                    value={accountForm.zipCode}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </FormGroup>
              </div>
              
              {isEditing && (
                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button 
                    type="button"
                    onClick={() => {
                      console.log('Cancel button clicked');
                      setIsEditing(false);
                      setAccountForm({
                        name: user.name || '',
                        email: user.email || '',
                        phone: user.phone || '',
                        address: user.address || '',
                        city: user.city || '',
                        state: user.state || '',
                        zipCode: user.zipCode || ''
                      });
                    }} 
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </AccountForm>
          </Section>
        ) : (
          <Section>
            <SectionTitle>
              {activeTab === 'orders' && 'All Orders'}
              {activeTab === 'in-progress' && 'Orders In Progress'}
              {activeTab === 'delivered' && 'Delivered Orders'}
            </SectionTitle>
            
            {filteredOrders.length === 0 ? (
              <EmptyState>
                <h3>No orders found</h3>
                <p>You haven't placed any orders yet.</p>
                <Button onClick={() => router.push('/productGrid')}>
                  Start Shopping
                </Button>
              </EmptyState>
            ) : (
              <OrderGrid>
                {filteredOrders.map((order) => (
                  <OrderCard key={order.id} onClick={() => {
                    setSelectedOrder(order);
                    setShowOrderModal(true);
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h4>Order {order.id}</h4>
                        <p>Placed on {new Date(order.date).toLocaleDateString()}</p>
                        <p>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <h4>${order.total.toFixed(2)}</h4>
                        <StatusBadge color={getStatusColor(order.status)}>
                          {getStatusText(order.status)}
                        </StatusBadge>
                      </div>
                    </div>
                  </OrderCard>
                ))}
              </OrderGrid>
            )}
          </Section>
        )}
      </TabContent>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <Modal onClick={() => setShowOrderModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>Order {selectedOrder.id}</h2>
              <CloseButton onClick={() => setShowOrderModal(false)}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <OrderDetails>
                <div>
                  <h4>Order Information</h4>
                  <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleDateString()}</p>
                  <p><strong>Status:</strong> 
                    <StatusBadge color={getStatusColor(selectedOrder.status)}>
                      {getStatusText(selectedOrder.status)}
                    </StatusBadge>
                  </p>
                  <p><strong>Total:</strong> ${selectedOrder.total.toFixed(2)}</p>
                </div>
                
                <div>
                  <h4>Items</h4>
                  <ProductList>
                    {selectedOrder.items.map((item, index) => (
                      <ProductItem key={index}>
                        <div>
                          <h5>{item.name}</h5>
                          <p>Quantity: {item.quantity}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <p>${item.price.toFixed(2)}</p>
                        </div>
                      </ProductItem>
                    ))}
                  </ProductList>
                </div>
              </OrderDetails>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => setShowOrderModal(false)}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default Profile; 