import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import Navigation from '../components/Navigation';
import { ProductsContext } from '../context/ProductsContext';

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
    query: {},
  }),
}));

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    href: '',
  },
  writable: true,
});

const renderWithProviders = (component, contextValue = {}) => {
  return render(
    <ThemeProvider theme={theme}>
      <ProductsContext.Provider value={contextValue}>
        {component}
      </ProductsContext.Provider>
    </ThemeProvider>
  );
};

describe('Navigation Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.location.href = '';
  });

  describe('Rendering', () => {
    test('renders navigation links correctly', () => {
      renderWithProviders(<Navigation />);
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Shop')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
      expect(screen.getByText('Bag')).toBeInTheDocument();
    });

    test('renders search input with correct attributes', () => {
      renderWithProviders(<Navigation />);
      
      const searchInput = screen.getByPlaceholderText('Search juices...');
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute('type', 'text');
      expect(searchInput).toHaveAttribute('aria-label', 'Search for juices');
    });

    test('renders search button with correct attributes', () => {
      renderWithProviders(<Navigation />);
      
      const searchButton = screen.getByRole('button', { name: 'Search' });
      expect(searchButton).toBeInTheDocument();
      expect(searchButton).toHaveAttribute('type', 'submit');
      expect(searchButton).toHaveAttribute('aria-label', 'Search');
    });
  });

  describe('Search Functionality', () => {
    test('updates search query when typing', () => {
      renderWithProviders(<Navigation />);
      
      const searchInput = screen.getByPlaceholderText('Search juices...');
      fireEvent.change(searchInput, { target: { value: 'orange juice' } });
      
      expect(searchInput).toHaveValue('orange juice');
    });

    test('handles empty search query', () => {
      renderWithProviders(<Navigation />);
      
      const searchInput = screen.getByPlaceholderText('Search juices...');
      const searchButton = screen.getByRole('button', { name: 'Search' });
      
      fireEvent.change(searchInput, { target: { value: '' } });
      fireEvent.click(searchButton);
      
      expect(window.location.href).toBe('');
    });

    test('handles whitespace-only search query', () => {
      renderWithProviders(<Navigation />);
      
      const searchInput = screen.getByPlaceholderText('Search juices...');
      const searchButton = screen.getByRole('button', { name: 'Search' });
      
      fireEvent.change(searchInput, { target: { value: '   ' } });
      fireEvent.click(searchButton);
      
      expect(window.location.href).toBe('');
    });

    test('submits search query correctly', () => {
      renderWithProviders(<Navigation />);
      
      const searchInput = screen.getByPlaceholderText('Search juices...');
      const searchButton = screen.getByRole('button', { name: 'Search' });
      
      fireEvent.change(searchInput, { target: { value: 'apple juice' } });
      fireEvent.click(searchButton);
      
      expect(window.location.href).toBe('/productGrid?search=apple%20juice');
    });

    test('submits search query on form submit', () => {
      renderWithProviders(<Navigation />);
      
      const searchInput = screen.getByPlaceholderText('Search juices...');
      const form = searchInput.closest('form');
      
      fireEvent.change(searchInput, { target: { value: 'grape juice' } });
      fireEvent.submit(form);
      
      expect(window.location.href).toBe('/productGrid?search=grape%20juice');
    });

    test('encodes special characters in search query', () => {
      renderWithProviders(<Navigation />);
      
      const searchInput = screen.getByPlaceholderText('Search juices...');
      const searchButton = screen.getByRole('button', { name: 'Search' });
      
      fireEvent.change(searchInput, { target: { value: 'orange & apple juice' } });
      fireEvent.click(searchButton);
      
      expect(window.location.href).toBe('/productGrid?search=orange%20%26%20apple%20juice');
    });
  });

  describe('Cart Functionality', () => {
    test('displays cart count when items are in cart', () => {
      const mockCart = [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 1 },
      ];
      
      renderWithProviders(<Navigation />, { cart: mockCart });
      
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    test('does not display cart count when cart is empty', () => {
      renderWithProviders(<Navigation />, { cart: [] });
      
      expect(screen.queryByText('0')).not.toBeInTheDocument();
    });

    test('handles undefined cart gracefully', () => {
      renderWithProviders(<Navigation />, { cart: undefined });
      
      expect(screen.queryByText('0')).not.toBeInTheDocument();
    });

    test('calculates total cart items correctly', () => {
      const mockCart = [
        { id: 1, quantity: 3 },
        { id: 2, quantity: 1 },
        { id: 3, quantity: 2 },
      ];
      
      renderWithProviders(<Navigation />, { cart: mockCart });
      
      expect(screen.getByText('6')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('search input has proper aria-label', () => {
      renderWithProviders(<Navigation />);
      
      const searchInput = screen.getByLabelText('Search for juices');
      expect(searchInput).toBeInTheDocument();
    });

    test('search button has proper aria-label', () => {
      renderWithProviders(<Navigation />);
      
      const searchButton = screen.getByLabelText('Search');
      expect(searchButton).toBeInTheDocument();
    });

    test('navigation links are keyboard accessible', () => {
      renderWithProviders(<Navigation />);
      
      const homeLink = screen.getByText('Home');
      const shopLink = screen.getByText('Shop');
      
      expect(homeLink).toBeInTheDocument();
      expect(shopLink).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    test('handles search with special characters', () => {
      renderWithProviders(<Navigation />);
      
      const searchInput = screen.getByPlaceholderText('Search juices...');
      const searchButton = screen.getByRole('button', { name: 'Search' });
      
      fireEvent.change(searchInput, { target: { value: '🍊 orange juice!' } });
      fireEvent.click(searchButton);
      
      expect(window.location.href).toBe('/productGrid?search=%F0%9F%8D%8A%20orange%20juice!');
    });

    test('handles very long search queries', () => {
      renderWithProviders(<Navigation />);
      
      const searchInput = screen.getByPlaceholderText('Search juices...');
      const searchButton = screen.getByRole('button', { name: 'Search' });
      
      const longQuery = 'a'.repeat(1000);
      fireEvent.change(searchInput, { target: { value: longQuery } });
      fireEvent.click(searchButton);
      
      expect(window.location.href).toContain('/productGrid?search=');
    });
  });
}); 