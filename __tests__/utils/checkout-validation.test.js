import React from 'react';
import { render, screen, fireEvent, waitFor } from './test-utils';
import Checkout from '../../pages/checkout';
import { createMockCartItem } from './test-utils';

describe('Checkout Form Validation', () => {
  const mockCart = [createMockCartItem()];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Required Field Validation', () => {
    test('validates all required fields are present', async () => {
      render(<Checkout />, { cart: mockCart });
      
      const placeOrderButton = screen.getByText('Place Order');
      fireEvent.click(placeOrderButton);
      
      await waitFor(() => {
        const requiredFields = [
          'First name is required',
          'Last name is required',
          'Email is required',
          'Phone is required',
          'Address is required',
          'City is required',
          'State is required',
          'Zip code is required',
          'Card number is required',
          'Card name is required',
          'Expiry month is required',
          'Expiry year is required',
          'Cvv is required'
        ];
        
        requiredFields.forEach(errorMessage => {
          expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
      });
    });

    test('validates fields with only whitespace', async () => {
      render(<Checkout />, { cart: mockCart });
      
      // Fill fields with only spaces
      fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: '   ' } });
      fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: '\t\n' } });
      
      const placeOrderButton = screen.getByText('Place Order');
      fireEvent.click(placeOrderButton);
      
      await waitFor(() => {
        expect(screen.getByText('First name is required')).toBeInTheDocument();
        expect(screen.getByText('Last name is required')).toBeInTheDocument();
      });
    });
  });

  describe('Email Validation', () => {
    test('accepts valid email formats', async () => {
      render(<Checkout />, { cart: mockCart });
      
      const emailInput = screen.getByLabelText(/email address/i);
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        '123@numbers.com',
        'user@subdomain.example.com'
      ];
      
      for (const email of validEmails) {
        fireEvent.change(emailInput, { target: { value: email } });
        fireEvent.blur(emailInput);
        
        await waitFor(() => {
          expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
        });
      }
    });

    test('rejects invalid email formats', async () => {
      render(<Checkout />, { cart: mockCart });
      
      const emailInput = screen.getByLabelText(/email address/i);
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'user@',
        'user@.com',
        'user..name@example.com',
        'user@example..com',
        'user name@example.com',
        'user@example com'
      ];
      
      for (const email of invalidEmails) {
        fireEvent.change(emailInput, { target: { value: email } });
        fireEvent.blur(emailInput);
        
        await waitFor(() => {
          expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
        });
        
        // Clear the error for next iteration
        fireEvent.change(emailInput, { target: { value: '' } });
      }
    });
  });

  describe('Phone Number Validation', () => {
    test('accepts valid phone number formats', async () => {
      render(<Checkout />, { cart: mockCart });
      
      const phoneInput = screen.getByLabelText(/phone number/i);
      const validPhones = [
        '1234567890',
        '+1234567890',
        '123-456-7890',
        '(123) 456-7890',
        '123.456.7890',
        '+1 (123) 456-7890',
        '123 456 7890'
      ];
      
      for (const phone of validPhones) {
        fireEvent.change(phoneInput, { target: { value: phone } });
        fireEvent.blur(phoneInput);
        
        await waitFor(() => {
          expect(screen.queryByText('Please enter a valid phone number')).not.toBeInTheDocument();
        });
      }
    });

    test('rejects invalid phone number formats', async () => {
      render(<Checkout />, { cart: mockCart });
      
      const phoneInput = screen.getByLabelText(/phone number/i);
      const invalidPhones = [
        'abc',
        '123',
        '123abc456',
        '123-abc-7890',
        '123.456.789',
        '+123-456-789',
        '123 456 789'
      ];
      
      for (const phone of invalidPhones) {
        fireEvent.change(phoneInput, { target: { value: phone } });
        fireEvent.blur(phoneInput);
        
        await waitFor(() => {
          expect(screen.getByText('Please enter a valid phone number')).toBeInTheDocument();
        });
        
        // Clear the error for next iteration
        fireEvent.change(phoneInput, { target: { value: '' } });
      }
    });
  });

  describe('Card Number Validation', () => {
    test('accepts valid card number lengths', async () => {
      render(<Checkout />, { cart: mockCart });
      
      const cardNumberInput = screen.getByLabelText(/card number/i);
      const validCardNumbers = [
        '1234567890123', // 13 digits
        '1234567890123456', // 16 digits
        '1234567890123456789', // 19 digits
        '1234 5678 9012 3456', // 16 digits with spaces
        '1234-5678-9012-3456' // 16 digits with dashes
      ];
      
      for (const cardNumber of validCardNumbers) {
        fireEvent.change(cardNumberInput, { target: { value: cardNumber } });
        fireEvent.blur(cardNumberInput);
        
        await waitFor(() => {
          expect(screen.queryByText('Please enter a valid card number')).not.toBeInTheDocument();
        });
      }
    });

    test('rejects invalid card number lengths', async () => {
      render(<Checkout />, { cart: mockCart });
      
      const cardNumberInput = screen.getByLabelText(/card number/i);
      const invalidCardNumbers = [
        '123',
        '123456',
        '123456789',
        '12345678901',
        '123456789012',
        '123456789012345678901234567890' // Too long
      ];
      
      for (const cardNumber of invalidCardNumbers) {
        fireEvent.change(cardNumberInput, { target: { value: cardNumber } });
        fireEvent.blur(cardNumberInput);
        
        await waitFor(() => {
          expect(screen.getByText('Please enter a valid card number')).toBeInTheDocument();
        });
        
        // Clear the error for next iteration
        fireEvent.change(cardNumberInput, { target: { value: '' } });
      }
    });
  });

  describe('CVV Validation', () => {
    test('accepts valid CVV lengths', async () => {
      render(<Checkout />, { cart: mockCart });
      
      const cvvInput = screen.getByLabelText(/cvv/i);
      const validCVVs = [
        '123', // 3 digits
        '1234' // 4 digits
      ];
      
      for (const cvv of validCVVs) {
        fireEvent.change(cvvInput, { target: { value: cvv } });
        fireEvent.blur(cvvInput);
        
        await waitFor(() => {
          expect(screen.queryByText('CVV must be at least 3 digits')).not.toBeInTheDocument();
        });
      }
    });

    test('rejects invalid CVV lengths', async () => {
      render(<Checkout />, { cart: mockCart });
      
      const cvvInput = screen.getByLabelText(/cvv/i);
      const invalidCVVs = [
        '1',
        '12',
        '12345', // Too long
        'abc',
        '12a'
      ];
      
      for (const cvv of invalidCVVs) {
        fireEvent.change(cvvInput, { target: { value: cvv } });
        fireEvent.blur(cvvInput);
        
        await waitFor(() => {
          expect(screen.getByText('CVV must be at least 3 digits')).toBeInTheDocument();
        });
        
        // Clear the error for next iteration
        fireEvent.change(cvvInput, { target: { value: '' } });
      }
    });
  });

  describe('Error Clearing', () => {
    test('clears validation errors when user starts typing', async () => {
      render(<Checkout />, { cart: mockCart });
      
      const firstNameInput = screen.getByLabelText(/first name/i);
      const emailInput = screen.getByLabelText(/email address/i);
      
      // Trigger validation errors
      const placeOrderButton = screen.getByText('Place Order');
      fireEvent.click(placeOrderButton);
      
      await waitFor(() => {
        expect(screen.getByText('First name is required')).toBeInTheDocument();
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });
      
      // Start typing to clear errors
      fireEvent.change(firstNameInput, { target: { value: 'John' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      
      await waitFor(() => {
        expect(screen.queryByText('First name is required')).not.toBeInTheDocument();
        expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
      });
    });

    test('clears specific field errors when that field is updated', async () => {
      render(<Checkout />, { cart: mockCart });
      
      const firstNameInput = screen.getByLabelText(/first name/i);
      const lastNameInput = screen.getByLabelText(/last name/i);
      
      // Trigger validation errors
      const placeOrderButton = screen.getByText('Place Order');
      fireEvent.click(placeOrderButton);
      
      await waitFor(() => {
        expect(screen.getByText('First name is required')).toBeInTheDocument();
        expect(screen.getByText('Last name is required')).toBeInTheDocument();
      });
      
      // Only update first name
      fireEvent.change(firstNameInput, { target: { value: 'John' } });
      
      await waitFor(() => {
        expect(screen.queryByText('First name is required')).not.toBeInTheDocument();
        expect(screen.getByText('Last name is required')).toBeInTheDocument(); // Should still be there
      });
    });
  });

  describe('Form Submission with Validation', () => {
    test('prevents submission when validation fails', async () => {
      const mockClearCart = jest.fn();
      render(<Checkout />, { cart: mockCart, clearCart: mockClearCart });
      
      // Try to submit without filling required fields
      const placeOrderButton = screen.getByText('Place Order');
      fireEvent.click(placeOrderButton);
      
      await waitFor(() => {
        expect(screen.getByText('First name is required')).toBeInTheDocument();
      });
      
      // Verify that cart was not cleared (submission failed)
      expect(mockClearCart).not.toHaveBeenCalled();
    });

    test('allows submission when all validations pass', async () => {
      const mockClearCart = jest.fn();
      render(<Checkout />, { cart: mockCart, clearCart: mockClearCart });
      
      // Fill out all required fields with valid data
      const validFormData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        cardNumber: '1234567890123456',
        cardName: 'John Doe',
        expiryMonth: '12',
        expiryYear: '2025',
        cvv: '123'
      };
      
      // Fill the form
      Object.entries(validFormData).forEach(([field, value]) => {
        const input = screen.getByLabelText(new RegExp(field.replace(/([A-Z])/g, ' $1').toLowerCase(), 'i'));
        fireEvent.change(input, { target: { value } });
      });
      
      const placeOrderButton = screen.getByText('Place Order');
      fireEvent.click(placeOrderButton);
      
      // Should not show validation errors
      await waitFor(() => {
        expect(screen.queryByText(/is required/)).not.toBeInTheDocument();
        expect(screen.queryByText(/Please enter a valid/)).not.toBeInTheDocument();
      });
    });
  });
});
