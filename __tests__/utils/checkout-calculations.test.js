import React from 'react';
import { render, screen } from './test-utils';
import Checkout from '../../pages/checkout';
import { createMockCartItem } from './test-utils';

describe('Checkout Calculations', () => {
  describe('Subtotal Calculation', () => {
    test('calculates subtotal correctly for single item', () => {
      const mockCart = [createMockCartItem({ price: 10.00, quantity: 1 })];
      render(<Checkout />, { cart: mockCart });
      
      expect(screen.getByText('$10.00')).toBeInTheDocument();
    });

    test('calculates subtotal correctly for multiple items', () => {
      const mockCart = [
        createMockCartItem({ price: 10.00, quantity: 2 }), // $20.00
        createMockCartItem({ price: 5.00, quantity: 1 }),  // $5.00
        createMockCartItem({ price: 15.50, quantity: 3 }), // $46.50
      ];
      render(<Checkout />, { cart: mockCart });
      
      // Total: $20.00 + $5.00 + $46.50 = $71.50
      expect(screen.getByText('$71.50')).toBeInTheDocument();
    });

    test('handles decimal prices correctly', () => {
      const mockCart = [
        createMockCartItem({ price: 9.99, quantity: 2 }), // $19.98
        createMockCartItem({ price: 4.50, quantity: 1 }), // $4.50
      ];
      render(<Checkout />, { cart: mockCart });
      
      // Total: $19.98 + $4.50 = $24.48
      expect(screen.getByText('$24.48')).toBeInTheDocument();
    });

    test('handles string prices correctly', () => {
      const mockCart = [
        createMockCartItem({ price: '10.00', quantity: 2 }), // $20.00
        createMockCartItem({ price: '5.50', quantity: 1 }),  // $5.50
      ];
      render(<Checkout />, { cart: mockCart });
      
      // Total: $20.00 + $5.50 = $25.50
      expect(screen.getByText('$25.50')).toBeInTheDocument();
    });

    test('handles zero quantity items', () => {
      const mockCart = [
        createMockCartItem({ price: 10.00, quantity: 0 }), // $0.00
        createMockCartItem({ price: 5.00, quantity: 1 }),  // $5.00
      ];
      render(<Checkout />, { cart: mockCart });
      
      // Total: $0.00 + $5.00 = $5.00
      expect(screen.getByText('$5.00')).toBeInTheDocument();
    });

    test('handles missing price values', () => {
      const mockCart = [
        createMockCartItem({ price: null, quantity: 1 }), // $0.00
        createMockCartItem({ price: undefined, quantity: 1 }), // $0.00
        createMockCartItem({ price: 10.00, quantity: 1 }), // $10.00
      ];
      render(<Checkout />, { cart: mockCart });
      
      // Total: $0.00 + $0.00 + $10.00 = $10.00
      expect(screen.getByText('$10.00')).toBeInTheDocument();
    });
  });

  describe('Shipping Calculation', () => {
    test('applies fixed shipping cost of $5.99', () => {
      const mockCart = [createMockCartItem({ price: 10.00, quantity: 1 })];
      render(<Checkout />, { cart: mockCart });
      
      expect(screen.getByText('$5.99')).toBeInTheDocument();
    });

    test('shipping cost is consistent regardless of cart value', () => {
      const mockCart1 = [createMockCartItem({ price: 1.00, quantity: 1 })];
      const mockCart2 = [createMockCartItem({ price: 1000.00, quantity: 1 })];
      
      const { rerender } = render(<Checkout />, { cart: mockCart1 });
      expect(screen.getByText('$5.99')).toBeInTheDocument();
      
      rerender(<Checkout />);
      expect(screen.getByText('$5.99')).toBeInTheDocument();
    });
  });

  describe('Tax Calculation', () => {
    test('calculates 8% tax correctly', () => {
      const mockCart = [createMockCartItem({ price: 100.00, quantity: 1 })];
      render(<Checkout />, { cart: mockCart });
      
      // Tax: $100.00 * 0.08 = $8.00
      expect(screen.getByText('$8.00')).toBeInTheDocument();
    });

    test('calculates tax on decimal amounts correctly', () => {
      const mockCart = [createMockCartItem({ price: 25.50, quantity: 1 })];
      render(<Checkout />, { cart: mockCart });
      
      // Tax: $25.50 * 0.08 = $2.04
      expect(screen.getByText('$2.04')).toBeInTheDocument();
    });

    test('calculates tax on zero subtotal correctly', () => {
      const mockCart = [createMockCartItem({ price: 0.00, quantity: 1 })];
      render(<Checkout />, { cart: mockCart });
      
      // Tax: $0.00 * 0.08 = $0.00
      expect(screen.getByText('$0.00')).toBeInTheDocument();
    });
  });

  describe('Total Calculation', () => {
    test('calculates total correctly: subtotal + shipping + tax', () => {
      const mockCart = [createMockCartItem({ price: 50.00, quantity: 1 })];
      render(<Checkout />, { cart: mockCart });
      
      // Subtotal: $50.00
      // Shipping: $5.99
      // Tax: $50.00 * 0.08 = $4.00
      // Total: $50.00 + $5.99 + $4.00 = $59.99
      expect(screen.getByText('$59.99')).toBeInTheDocument();
    });

    test('calculates total with multiple items correctly', () => {
      const mockCart = [
        createMockCartItem({ price: 20.00, quantity: 2 }), // $40.00
        createMockCartItem({ price: 10.00, quantity: 1 }), // $10.00
      ];
      render(<Checkout />, { cart: mockCart });
      
      // Subtotal: $50.00
      // Shipping: $5.99
      // Tax: $50.00 * 0.08 = $4.00
      // Total: $50.00 + $5.99 + $4.00 = $59.99
      expect(screen.getByText('$59.99')).toBeInTheDocument();
    });

    test('handles edge case with very small amounts', () => {
      const mockCart = [createMockCartItem({ price: 0.01, quantity: 1 })];
      render(<Checkout />, { cart: mockCart });
      
      // Subtotal: $0.01
      // Shipping: $5.99
      // Tax: $0.01 * 0.08 = $0.00 (rounded)
      // Total: $0.01 + $5.99 + $0.00 = $6.00
      expect(screen.getByText('$6.00')).toBeInTheDocument();
    });

    test('handles large amounts correctly', () => {
      const mockCart = [createMockCartItem({ price: 1000.00, quantity: 1 })];
      render(<Checkout />, { cart: mockCart });
      
      // Subtotal: $1000.00
      // Shipping: $5.99
      // Tax: $1000.00 * 0.08 = $80.00
      // Total: $1000.00 + $5.99 + $80.00 = $1085.99
      expect(screen.getByText('$1085.99')).toBeInTheDocument();
    });
  });

  describe('Price Display Formatting', () => {
    test('displays prices with two decimal places', () => {
      const mockCart = [createMockCartItem({ price: 10.5, quantity: 1 })];
      render(<Checkout />, { cart: mockCart });
      
      expect(screen.getByText('$10.50')).toBeInTheDocument();
    });

    test('displays individual item prices correctly', () => {
      const mockCart = [
        createMockCartItem({ 
          id: '1', 
          name: 'Apple Juice', 
          price: 5.99, 
          quantity: 2 
        }),
        createMockCartItem({ 
          id: '2', 
          name: 'Orange Juice', 
          price: 4.50, 
          quantity: 1 
        }),
      ];
      render(<Checkout />, { cart: mockCart });
      
      // Individual item totals
      expect(screen.getByText('$11.98')).toBeInTheDocument(); // 5.99 * 2
      expect(screen.getByText('$4.50')).toBeInTheDocument();  // 4.50 * 1
    });

    test('handles rounding correctly', () => {
      const mockCart = [createMockCartItem({ price: 10.999, quantity: 1 })];
      render(<Checkout />, { cart: mockCart });
      
      // Should round to $11.00
      expect(screen.getByText('$11.00')).toBeInTheDocument();
    });
  });

  describe('Empty Cart Handling', () => {
    test('shows zero totals for empty cart', () => {
      render(<Checkout />, { cart: [] });
      
      // Should show empty cart message instead of totals
      expect(screen.getByText('Your cart is empty. Please add some items before checkout.')).toBeInTheDocument();
    });

    test('handles cart with null or undefined items', () => {
      const mockCart = [null, undefined, createMockCartItem({ price: 10.00, quantity: 1 })];
      render(<Checkout />, { cart: mockCart });
      
      // Should only calculate for valid items
      expect(screen.getByText('$10.00')).toBeInTheDocument();
    });
  });

  describe('Order Summary Display', () => {
    test('displays all price breakdown sections', () => {
      const mockCart = [createMockCartItem({ price: 10.00, quantity: 1 })];
      render(<Checkout />, { cart: mockCart });
      
      expect(screen.getByText('Subtotal')).toBeInTheDocument();
      expect(screen.getByText('Shipping')).toBeInTheDocument();
      expect(screen.getByText('Tax')).toBeInTheDocument();
      expect(screen.getByText('Total')).toBeInTheDocument();
    });

    test('displays correct item quantities in summary', () => {
      const mockCart = [
        createMockCartItem({ id: '1', name: 'Apple Juice', quantity: 3 }),
        createMockCartItem({ id: '2', name: 'Orange Juice', quantity: 1 }),
      ];
      render(<Checkout />, { cart: mockCart });
      
      expect(screen.getByText('Qty: 3')).toBeInTheDocument();
      expect(screen.getByText('Qty: 1')).toBeInTheDocument();
    });

    test('displays item names correctly in summary', () => {
      const mockCart = [
        createMockCartItem({ id: '1', name: 'Fresh Apple Juice', quantity: 1 }),
        createMockCartItem({ id: '2', name: 'Organic Orange Juice', quantity: 1 }),
      ];
      render(<Checkout />, { cart: mockCart });
      
      expect(screen.getByText('Fresh Apple Juice')).toBeInTheDocument();
      expect(screen.getByText('Organic Orange Juice')).toBeInTheDocument();
    });
  });
});
