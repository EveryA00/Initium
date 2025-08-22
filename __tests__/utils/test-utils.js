import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ProductsContext } from '../../context/ProductsContext';
import theme from '../../styles/theme';

// Custom render function that includes providers
const AllTheProviders = ({ children, cart = [], clearCart = jest.fn() }) => {
  const productsContextValue = {
    cart,
    clearCart,
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    updateQuantity: jest.fn(),
  };

  return (
    <ThemeProvider theme={theme}>
      <ProductsContext.Provider value={productsContextValue}>
        {children}
      </ProductsContext.Provider>
    </ThemeProvider>
  );
};

const customRender = (ui, options = {}) => {
  const { cart, clearCart, ...renderOptions } = options;
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders cart={cart} clearCart={clearCart}>
        {children}
      </AllTheProviders>
    ),
    ...renderOptions,
  });
};

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };

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
