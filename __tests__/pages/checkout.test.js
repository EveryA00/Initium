import React from 'react';
import { render, screen, fireEvent, waitFor } from '../utils/test-utils';
import userEvent from '@testing-library/user-event';
import Checkout from '../../pages/checkout';
import { createMockCartItem, createMockFormData } from '../utils/test-utils';

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: mockPush,
      route: '/checkout',
      pathname: '/checkout',
      query: {},
      asPath: '/checkout',
    };
  },
}));

describe('Checkout Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('renders checkout page with title', () => {
      const mockCart = [createMockCartItem()];
      render(<Checkout />, { cart: mockCart });
      
      expect(screen.getByText('Checkout')).toBeInTheDocument();
    });

    test('renders empty cart message when cart is empty', () => {
      render(<Checkout />, { cart: [] });
      
      expect(screen.getByText('Your cart is empty. Please add some items before checkout.')).toBeInTheDocument();
      expect(screen.getByText('Back to Shopping Bag')).toBeInTheDocument();
    });

    test('renders all form sections when cart has items', () => {
      const mockCart = [createMockCartItem()];
      render(<Checkout />, { cart: mockCart });
      
      expect(screen.getByText('Shipping Information')).toBeInTheDocument();
      expect(screen.getByText('Payment Information')).toBeInTheDocument();
      expect(screen.getByText('Additional Information')).toBeInTheDocument();
      expect(screen.getByText('Order Summary')).toBeInTheDocument();
    });

    test('renders all required form fields', () => {
      const mockCart = [createMockCartItem()];
      render(<Checkout />, { cart: mockCart });
      
      // Shipping Information fields
      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/street address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/state/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/zip code/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
      
      // Payment Information fields
      expect(screen.getByLabelText(/card number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/name on card/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/expiry month/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/expiry year/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/cvv/i)).toBeInTheDocument();
      
      // Additional Information fields
      expect(screen.getByLabelText(/special instructions/i)).toBeInTheDocument();
    });
  });

  describe('Order Summary', () => {
    test('displays cart items in order summary', () => {
      const mockCart = [
        createMockCartItem({ id: '1', name: 'Apple Juice', price: 5.99, quantity: 2 }),
        createMockCartItem({ id: '2', name: 'Orange Juice', price: 4.99, quantity: 1 }),
      ];
      render(<Checkout />, { cart: mockCart });
      
      expect(screen.getByText('Apple Juice')).toBeInTheDocument();
      expect(screen.getByText('Orange Juice')).toBeInTheDocument();
      expect(screen.getByText('Qty: 2')).toBeInTheDocument();
      expect(screen.getByText('Qty: 1')).toBeInTheDocument();
    });

    test('calculates and displays correct totals', () => {
      const mockCart = [
        createMockCartItem({ price: 10.00, quantity: 2 }), // $20.00
        createMockCartItem({ price: 5.00, quantity: 1 }),  // $5.00
      ];
      render(<Checkout />, { cart: mockCart });
      
      // Subtotal: $25.00
      // Shipping: $5.99
      // Tax (8%): $2.00
      // Total: $32.99
      expect(screen.getByText('$25.00')).toBeInTheDocument();
      expect(screen.getByText('$5.99')).toBeInTheDocument();
      expect(screen.getByText('$2.00')).toBeInTheDocument();
      expect(screen.getByText('$32.99')).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    test('shows validation errors for empty required fields', async () => {
      const mockCart = [createMockCartItem()];
      render(<Checkout />, { cart: mockCart });
      
      const placeOrderButton = screen.getByText('Place Order');
      fireEvent.click(placeOrderButton);
      
      await waitFor(() => {
        expect(screen.getByText('First name is required')).toBeInTheDocument();
        expect(screen.getByText('Last name is required')).toBeInTheDocument();
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Phone is required')).toBeInTheDocument();
        expect(screen.getByText('Address is required')).toBeInTheDocument();
        expect(screen.getByText('City is required')).toBeInTheDocument();
        expect(screen.getByText('State is required')).toBeInTheDocument();
        expect(screen.getByText('Zip code is required')).toBeInTheDocument();
        expect(screen.getByText('Card number is required')).toBeInTheDocument();
        expect(screen.getByText('Card name is required')).toBeInTheDocument();
        expect(screen.getByText('Expiry month is required')).toBeInTheDocument();
        expect(screen.getByText('Expiry year is required')).toBeInTheDocument();
        expect(screen.getByText('Cvv is required')).toBeInTheDocument();
      });
    });

    test('validates email format', async () => {
      const mockCart = [createMockCartItem()];
      render(<Checkout />, { cart: mockCart });
      
      const emailInput = screen.getByLabelText(/email address/i);
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.blur(emailInput);
      
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });
    });

    test('validates phone number format', async () => {
      const mockCart = [createMockCartItem()];
      render(<Checkout />, { cart: mockCart });
      
      const phoneInput = screen.getByLabelText(/phone number/i);
      fireEvent.change(phoneInput, { target: { value: 'abc' } });
      fireEvent.blur(phoneInput);
      
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid phone number')).toBeInTheDocument();
      });
    });

    test('validates card number length', async () => {
      const mockCart = [createMockCartItem()];
      render(<Checkout />, { cart: mockCart });
      
      const cardNumberInput = screen.getByLabelText(/card number/i);
      fireEvent.change(cardNumberInput, { target: { value: '123' } });
      fireEvent.blur(cardNumberInput);
      
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid card number')).toBeInTheDocument();
      });
    });

    test('validates CVV length', async () => {
      const mockCart = [createMockCartItem()];
      render(<Checkout />, { cart: mockCart });
      
      const cvvInput = screen.getByLabelText(/cvv/i);
      fireEvent.change(cvvInput, { target: { value: '12' } });
      fireEvent.blur(cvvInput);
      
      await waitFor(() => {
        expect(screen.getByText('CVV must be at least 3 digits')).toBeInTheDocument();
      });
    });

    test('clears validation errors when user starts typing', async () => {
      const mockCart = [createMockCartItem()];
      render(<Checkout />, { cart: mockCart });
      
      const firstNameInput = screen.getByLabelText(/first name/i);
      
      // Trigger validation error
      const placeOrderButton = screen.getByText('Place Order');
      fireEvent.click(placeOrderButton);
      
      await waitFor(() => {
        expect(screen.getByText('First name is required')).toBeInTheDocument();
      });
      
      // Start typing to clear error
      fireEvent.change(firstNameInput, { target: { value: 'John' } });
      
      await waitFor(() => {
        expect(screen.queryByText('First name is required')).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Interactions', () => {
    test('updates form data when user types', async () => {
      const mockCart = [createMockCartItem()];
      render(<Checkout />, { cart: mockCart });
      
      const firstNameInput = screen.getByLabelText(/first name/i);
      const lastNameInput = screen.getByLabelText(/last name/i);
      const emailInput = screen.getByLabelText(/email address/i);
      
      fireEvent.change(firstNameInput, { target: { value: 'John' } });
      fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
      
      expect(firstNameInput.value).toBe('John');
      expect(lastNameInput.value).toBe('Doe');
      expect(emailInput.value).toBe('john.doe@example.com');
    });

    test('handles select dropdown changes', async () => {
      const mockCart = [createMockCartItem()];
      render(<Checkout />, { cart: mockCart });
      
      const countrySelect = screen.getByLabelText(/country/i);
      const expiryMonthSelect = screen.getByLabelText(/expiry month/i);
      const expiryYearSelect = screen.getByLabelText(/expiry year/i);
      
      fireEvent.change(countrySelect, { target: { value: 'Canada' } });
      fireEvent.change(expiryMonthSelect, { target: { value: '06' } });
      fireEvent.change(expiryYearSelect, { target: { value: '2026' } });
      
      expect(countrySelect.value).toBe('Canada');
      expect(expiryMonthSelect.value).toBe('06');
      expect(expiryYearSelect.value).toBe('2026');
    });

    test('handles textarea input', async () => {
      const mockCart = [createMockCartItem()];
      render(<Checkout />, { cart: mockCart });
      
      const specialInstructionsTextarea = screen.getByLabelText(/special instructions/i);
      const instructions = 'Please deliver to the back door';
      
      fireEvent.change(specialInstructionsTextarea, { target: { value: instructions } });
      
      expect(specialInstructionsTextarea.value).toBe(instructions);
    });
  });

  describe('Form Submission', () => {
    test('submits form successfully with valid data', async () => {
      const mockCart = [createMockCartItem()];
      const mockClearCart = jest.fn();
      render(<Checkout />, { cart: mockCart, clearCart: mockClearCart });
      
      // Fill out all required fields
      const formData = createMockFormData();
      
      fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: formData.firstName } });
      fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: formData.lastName } });
      fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: formData.email } });
      fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: formData.phone } });
      fireEvent.change(screen.getByLabelText(/street address/i), { target: { value: formData.address } });
      fireEvent.change(screen.getByLabelText(/city/i), { target: { value: formData.city } });
      fireEvent.change(screen.getByLabelText(/state/i), { target: { value: formData.state } });
      fireEvent.change(screen.getByLabelText(/zip code/i), { target: { value: formData.zipCode } });
      fireEvent.change(screen.getByLabelText(/card number/i), { target: { value: formData.cardNumber } });
      fireEvent.change(screen.getByLabelText(/name on card/i), { target: { value: formData.cardName } });
      fireEvent.change(screen.getByLabelText(/expiry month/i), { target: { value: formData.expiryMonth } });
      fireEvent.change(screen.getByLabelText(/expiry year/i), { target: { value: formData.expiryYear } });
      fireEvent.change(screen.getByLabelText(/cvv/i), { target: { value: formData.cvv } });
      
      const placeOrderButton = screen.getByText('Place Order');
      fireEvent.click(placeOrderButton);
      
      // Check loading state
      expect(screen.getByText('Processing...')).toBeInTheDocument();
      
      // Wait for submission to complete
      await waitFor(() => {
        expect(screen.getByText('Order Confirmed!')).toBeInTheDocument();
      }, { timeout: 3000 });
      
      // Verify cart was cleared
      expect(mockClearCart).toHaveBeenCalled();
    });

    test('shows error message for empty cart submission', async () => {
      render(<Checkout />, { cart: [] });
      
      const placeOrderButton = screen.getByText('Place Order');
      fireEvent.click(placeOrderButton);
      
      await waitFor(() => {
        expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
      });
    });

    test('handles submission errors gracefully', async () => {
      const mockCart = [createMockCartItem()];
      render(<Checkout />, { cart: mockCart });
      
      // Mock a failed submission by temporarily overriding the setTimeout
      const originalSetTimeout = global.setTimeout;
      global.setTimeout = jest.fn((callback) => {
        throw new Error('Network error');
      });
      
      // Fill out form with valid data
      const formData = createMockFormData();
      fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: formData.firstName } });
      fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: formData.lastName } });
      fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: formData.email } });
      fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: formData.phone } });
      fireEvent.change(screen.getByLabelText(/street address/i), { target: { value: formData.address } });
      fireEvent.change(screen.getByLabelText(/city/i), { target: { value: formData.city } });
      fireEvent.change(screen.getByLabelText(/state/i), { target: { value: formData.state } });
      fireEvent.change(screen.getByLabelText(/zip code/i), { target: { value: formData.zipCode } });
      fireEvent.change(screen.getByLabelText(/card number/i), { target: { value: formData.cardNumber } });
      fireEvent.change(screen.getByLabelText(/name on card/i), { target: { value: formData.cardName } });
      fireEvent.change(screen.getByLabelText(/expiry month/i), { target: { value: formData.expiryMonth } });
      fireEvent.change(screen.getByLabelText(/expiry year/i), { target: { value: formData.expiryYear } });
      fireEvent.change(screen.getByLabelText(/cvv/i), { target: { value: formData.cvv } });
      
      const placeOrderButton = screen.getByText('Place Order');
      fireEvent.click(placeOrderButton);
      
      await waitFor(() => {
        expect(screen.getByText('There was an error processing your order. Please try again.')).toBeInTheDocument();
      });
      
      // Restore original setTimeout
      global.setTimeout = originalSetTimeout;
    });
  });

  describe('Navigation', () => {
    test('navigates back to bag when back button is clicked', () => {
      const mockCart = [createMockCartItem()];
      render(<Checkout />, { cart: mockCart });
      
      const backButton = screen.getByText('Back to Shopping Bag');
      fireEvent.click(backButton);
      
      expect(mockPush).toHaveBeenCalledWith('/bag');
    });

    test('navigates to home page after successful order', async () => {
      const mockCart = [createMockCartItem()];
      render(<Checkout />, { cart: mockCart });
      
      // Fill out form with valid data
      const formData = createMockFormData();
      fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: formData.firstName } });
      fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: formData.lastName } });
      fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: formData.email } });
      fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: formData.phone } });
      fireEvent.change(screen.getByLabelText(/street address/i), { target: { value: formData.address } });
      fireEvent.change(screen.getByLabelText(/city/i), { target: { value: formData.city } });
      fireEvent.change(screen.getByLabelText(/state/i), { target: { value: formData.state } });
      fireEvent.change(screen.getByLabelText(/zip code/i), { target: { value: formData.zipCode } });
      fireEvent.change(screen.getByLabelText(/card number/i), { target: { value: formData.cardNumber } });
      fireEvent.change(screen.getByLabelText(/name on card/i), { target: { value: formData.cardName } });
      fireEvent.change(screen.getByLabelText(/expiry month/i), { target: { value: formData.expiryMonth } });
      fireEvent.change(screen.getByLabelText(/expiry year/i), { target: { value: formData.expiryYear } });
      fireEvent.change(screen.getByLabelText(/cvv/i), { target: { value: formData.cvv } });
      
      const placeOrderButton = screen.getByText('Place Order');
      fireEvent.click(placeOrderButton);
      
      // Wait for success and redirect
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/');
      }, { timeout: 4000 });
    });
  });

  describe('Accessibility', () => {
    test('has proper form labels and associations', () => {
      const mockCart = [createMockCartItem()];
      render(<Checkout />, { cart: mockCart });
      
      // Check that all form fields have associated labels
      const firstNameInput = screen.getByLabelText(/first name/i);
      const lastNameInput = screen.getByLabelText(/last name/i);
      const emailInput = screen.getByLabelText(/email address/i);
      
      expect(firstNameInput).toHaveAttribute('id', 'firstName');
      expect(lastNameInput).toHaveAttribute('id', 'lastName');
      expect(emailInput).toHaveAttribute('id', 'email');
    });

    test('has proper button types and states', () => {
      const mockCart = [createMockCartItem()];
      render(<Checkout />, { cart: mockCart });
      
      const placeOrderButton = screen.getByText('Place Order');
      const backButton = screen.getByText('Back to Shopping Bag');
      
      expect(placeOrderButton).toHaveAttribute('type', 'submit');
      expect(backButton).toHaveAttribute('type', 'button');
    });
  });
});
