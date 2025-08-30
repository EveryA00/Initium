import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../lib/stripe';
import StripePaymentForm from '../components/StripePaymentForm';
import {
  Container,
  Title,
  Content,
  CheckoutForm,
  Section,
  SectionTitle,
  FormGrid,
  FormGroup,
  Label,
  Input,
  TextArea,
  Select,
  OrderSummary,
  SummaryTitle,
  OrderItems,
  OrderItem,
  ItemInfo,
  ItemName,
  ItemQuantity,
  ItemPrice,
  PriceBreakdown,
  PriceRow,
  PriceLabel,
  PriceValue,
  PlaceOrderButton,
  BackToBagButton,
  ErrorMessage,
  SuccessMessage
} from '../styles/checkoutStyledComponents.js';
import { ProductsContext } from '../context/ProductsContext.js';

const Checkout = () => {
  const router = useRouter();
  const { cart, clearCart } = useContext(ProductsContext);
  
  // Form state
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Additional Information
    specialInstructions: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  // Calculate totals
  const subtotal = cart?.reduce((sum, item) => {
    const price = typeof item?.price === 'number' ? item.price : parseFloat(item?.price || 0);
    const quantity = item?.quantity || 0;
    return sum + (price * quantity);
  }, 0);
  
  const shipping = 5.99; // Fixed shipping cost
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 
      'address', 'city', 'state', 'zipCode'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    

    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (cart.length === 0) {
      setErrors({ general: 'Your cart is empty' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the order to your backend
      console.log('Order submitted:', {
        customerInfo: formData,
        items: cart,
        total: total
      });
      
      setOrderSuccess(true);
      clearCart();
      
      // Redirect to success page after 3 seconds
      setTimeout(() => {
        router.push('/');
      }, 3000);
      
    } catch (error) {
      console.error('Order submission error:', error);
      setErrors({ general: 'There was an error processing your order. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle back to bag
  const handleBackToBag = () => {
    router.push('/bag');
  };
  
  // If cart is empty, redirect to bag
  if (cart.length === 0 && !orderSuccess) {
    return (
      <Container>
        <Title>Checkout</Title>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Your cart is empty. Please add some items before checkout.</p>
          <BackToBagButton onClick={() => router.push('/bag')}>
            Back to Shopping Bag
          </BackToBagButton>
        </div>
      </Container>
    );
  }
  
  // Success message
  if (orderSuccess) {
    return (
      <Container>
        <Title>Order Confirmed!</Title>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <SuccessMessage style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
            Thank you for your order! You will receive a confirmation email shortly.
          </SuccessMessage>
          <p>Redirecting to home page...</p>
        </div>
      </Container>
    );
  }
  
  return (
    <Container>
      <Title>Checkout</Title>
      
      <Content>
        <CheckoutForm onSubmit={handleSubmit}>
          {/* Shipping Information */}
          <Section>
            <SectionTitle>Shipping Information</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your street address"
                />
                {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="city">City *</Label>
                <Input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter your city"
                />
                {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="state">State *</Label>
                <Input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Enter your state"
                />
                {errors.state && <ErrorMessage>{errors.state}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="Enter your ZIP code"
                />
                {errors.zipCode && <ErrorMessage>{errors.zipCode}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="country">Country</Label>
                <Select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                </Select>
              </FormGroup>
            </FormGrid>
          </Section>
          
          {/* Payment Information */}
          <Section>
            <SectionTitle>Payment Information</SectionTitle>
            <Elements stripe={stripePromise}>
              <StripePaymentForm
                amount={Math.round(total * 100)} // Convert to cents
                onPaymentSuccess={(result) => {
                  console.log('Payment successful:', result);
                  setOrderSuccess(true);
                  clearCart();
                  setTimeout(() => {
                    router.push('/');
                  }, 3000);
                }}
                onPaymentError={(error) => {
                  console.error('Payment error:', error);
                  setErrors({ general: error.message || 'Payment failed. Please try again.' });
                }}
                isProcessing={isSubmitting}
              />
            </Elements>
          </Section>
          
          {/* Additional Information */}
          <Section>
            <SectionTitle>Additional Information</SectionTitle>
            <FormGroup>
              <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
              <TextArea
                id="specialInstructions"
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
                placeholder="Any special delivery instructions or notes..."
              />
            </FormGroup>
          </Section>
          
          {errors.general && (
            <ErrorMessage style={{ textAlign: 'center', fontSize: '1rem' }}>
              {errors.general}
            </ErrorMessage>
          )}
        </CheckoutForm>
        
        {/* Order Summary */}
        <OrderSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          
          <OrderItems>
            {cart.map((item) => (
              <OrderItem key={item.id}>
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemQuantity>Qty: {item.quantity}</ItemQuantity>
                </ItemInfo>
                <ItemPrice>
                  ${((typeof item.price === 'number' ? item.price : parseFloat(item.price || 0)) * item.quantity).toFixed(2)}
                </ItemPrice>
              </OrderItem>
            ))}
          </OrderItems>
          
          <PriceBreakdown>
            <PriceRow>
              <PriceLabel>Subtotal</PriceLabel>
              <PriceValue>${subtotal.toFixed(2)}</PriceValue>
            </PriceRow>
            <PriceRow>
              <PriceLabel>Shipping</PriceLabel>
              <PriceValue>${shipping.toFixed(2)}</PriceValue>
            </PriceRow>
            <PriceRow>
              <PriceLabel>Tax</PriceLabel>
              <PriceValue>${tax.toFixed(2)}</PriceValue>
            </PriceRow>
            <PriceRow isTotal>
              <PriceLabel>Total</PriceLabel>
              <PriceValue>${total.toFixed(2)}</PriceValue>
            </PriceRow>
          </PriceBreakdown>
          
          <PlaceOrderButton 
            type="submit" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Place Order'}
          </PlaceOrderButton>
          
          <BackToBagButton onClick={handleBackToBag}>
            Back to Shopping Bag
          </BackToBagButton>
        </OrderSummary>
      </Content>
    </Container>
  );
};

export default Checkout;
