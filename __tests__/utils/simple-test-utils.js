import React from 'react';
import { render } from '@testing-library/react';
import { ProductsContext } from '../../context/ProductsContext';

// Simple render function without styled-components
const SimpleProviders = ({ children, cart = [], clearCart = jest.fn() }) => {
  const productsContextValue = {
    cart,
    clearCart,
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    updateQuantity: jest.fn(),
  };

  return (
    <ProductsContext.Provider value={productsContextValue}>
      {children}
    </ProductsContext.Provider>
  );
};

const simpleRender = (ui, options = {}) => {
  const { cart, clearCart, ...renderOptions } = options;
  return render(ui, {
    wrapper: ({ children }) => (
      <SimpleProviders cart={cart} clearCart={clearCart}>
        {children}
      </SimpleProviders>
    ),
    ...renderOptions,
  });
};

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { simpleRender as render };

// Helper function to create mock cart items
export const createMockCartItem = (overrides = {}) => ({
  id: '1',
  name: 'Test Product',
  price: 9.99,
  quantity: 1,
  image: '/test-image.jpg',
  ...overrides,
});

// Helper function to create mock form data
export const createMockFormData = (overrides = {}) => ({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '1234567890',
  address: '123 Main St',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  country: 'United States',
  cardNumber: '1234567890123456',
  cardName: 'John Doe',
  expiryMonth: '12',
  expiryYear: '2025',
  cvv: '123',
  specialInstructions: '',
  ...overrides,
});
