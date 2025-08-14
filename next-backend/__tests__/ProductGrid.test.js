import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import ProductGrid from '../pages/productGrid';
import { ProductsContext } from '../context/ProductsContext';

// Mock Next.js router
const mockPush = jest.fn();
const mockQuery = {};
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
    query: mockQuery,
  }),
}));

const mockProducts = [
  {
    id: 1,
    name: 'Orange Juice',
    description: 'Fresh orange juice',
    price: '5.99',
    category: 'fruit',
    popularity: 10,
  },
  {
    id: 2,
    name: 'Apple Juice',
    description: 'Fresh apple juice',
    price: '4.99',
    category: 'fruit',
    popularity: 8,
  },
  {
    id: 3,
    name: 'Carrot Juice',
    description: 'Fresh carrot juice',
    price: '6.99',
    category: 'vegetable',
    popularity: 5,
  },
  {
    id: 4,
    name: 'Green Detox',
    description: 'Detox green juice',
    price: '8.99',
    category: 'detox',
    popularity: 12,
  },
];

const renderWithProviders = (component, contextValue = {}) => {
  return render(
    <ThemeProvider theme={theme}>
      <ProductsContext.Provider value={contextValue}>
        {component}
      </ProductsContext.Provider>
    </ThemeProvider>
  );
};

describe('ProductGrid Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockQuery.search = undefined;
  });

  describe('Rendering', () => {
    test('renders filter controls correctly', () => {
      renderWithProviders(<ProductGrid />, { products: mockProducts });
      
      expect(screen.getByText('Search & Filter')).toBeInTheDocument();
      expect(screen.getByText('Category')).toBeInTheDocument();
      expect(screen.getByText('Price Range')).toBeInTheDocument();
      expect(screen.getByText('Sort By')).toBeInTheDocument();
    });

    test('renders all products when no filters applied', () => {
      renderWithProviders(<ProductGrid />, { products: mockProducts });
      
      expect(screen.getByText('Orange Juice')).toBeInTheDocument();
      expect(screen.getByText('Apple Juice')).toBeInTheDocument();
      expect(screen.getByText('Carrot Juice')).toBeInTheDocument();
      expect(screen.getByText('Green Detox')).toBeInTheDocument();
    });

    test('renders no results message when no products match filters', () => {
      renderWithProviders(<ProductGrid />, { products: [] });
      
      expect(screen.getByText('No products found')).toBeInTheDocument();
      expect(screen.getByText('Try adjusting your search or filters')).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    test('filters products by search query', async () => {
      renderWithProviders(<ProductGrid />, { products: mockProducts });
      
      const searchInput = screen.getByPlaceholderText('Search juices...');
      fireEvent.change(searchInput, { target: { value: 'orange' } });
      
      await waitFor(() => {
        expect(screen.getByText('Orange Juice')).toBeInTheDocument();
        expect(screen.queryByText('Apple Juice')).not.toBeInTheDocument();
        expect(screen.queryByText('Carrot Juice')).not.toBeInTheDocument();
      });
    });

    test('filters products by description', async () => {
      renderWithProviders(<ProductGrid />, { products: mockProducts });
      
      const searchInput = screen.getByPlaceholderText('Search juices...');
      fireEvent.change(searchInput, { target: { value: 'fresh' } });
      
      await waitFor(() => {
        expect(screen.getByText('Orange Juice')).toBeInTheDocument();
        expect(screen.getByText('Apple Juice')).toBeInTheDocument();
        expect(screen.getByText('Carrot Juice')).toBeInTheDocument();
      });
    });

    test('case insensitive search', async () => {
      renderWithProviders(<ProductGrid />, { products: mockProducts });
      
      const searchInput = screen.getByPlaceholderText('Search juices...');
      fireEvent.change(searchInput, { target: { value: 'ORANGE' } });
      
      await waitFor(() => {
        expect(screen.getByText('Orange Juice')).toBeInTheDocument();
      });
    });

    test('handles empty search query', async () => {
      renderWithProviders(<ProductGrid />, { products: mockProducts });
      
      const searchInput = screen.getByPlaceholderText('Search juices...');
      fireEvent.change(searchInput, { target: { value: '' } });
      
      await waitFor(() => {
        expect(screen.getByText('Orange Juice')).toBeInTheDocument();
        expect(screen.getByText('Apple Juice')).toBeInTheDocument();
        expect(screen.getByText('Carrot Juice')).toBeInTheDocument();
        expect(screen.getByText('Green Detox')).toBeInTheDocument();
      });
    });
  });

  describe('Category Filtering', () => {
    test('filters by fruit category', async () => {
      renderWithProviders(<ProductGrid />, { products: mockProducts });
      
      const categorySelect = screen.getByDisplayValue('All Categories');
      fireEvent.change(categorySelect, { target: { value: 'fruit' } });
      
      await waitFor(() => {
        expect(screen.getByText('Orange Juice')).toBeInTheDocument();
        expect(screen.getByText('Apple Juice')).toBeInTheDocument();
        expect(screen.queryByText('Carrot Juice')).not.toBeInTheDocument();
        expect(screen.queryByText('Green Detox')).not.toBeInTheDocument();
      });
    });

    test('filters by vegetable category', async () => {
      renderWithProviders(<ProductGrid />, { products: mockProducts });
      
      const categorySelect = screen.getByDisplayValue('All Categories');
      fireEvent.change(categorySelect, { target: { value: 'vegetable' } });
      
      await waitFor(() => {
        expect(screen.getByText('Carrot Juice')).toBeInTheDocument();
        expect(screen.queryByText('Orange Juice')).not.toBeInTheDocument();
        expect(screen.queryByText('Apple Juice')).not.toBeInTheDocument();
      });
    });

    test('shows all products when "All Categories" selected', async () => {
      renderWithProviders(<ProductGrid />, { products: mockProducts });
      
      const categorySelect = screen.getByDisplayValue('All Categories');
      fireEvent.change(categorySelect, { target: { value: 'all' } });
      
      await waitFor(() => {
        expect(screen.getByText('Orange Juice')).toBeInTheDocument();
        expect(screen.getByText('Apple Juice')).toBeInTheDocument();
        expect(screen.getByText('Carrot Juice')).toBeInTheDocument();
        expect(screen.getByText('Green Detox')).toBeInTheDocument();
      });
    });
  });

  describe('Price Filtering', () => {
    test('filters by price range $0-5', async () => {
      renderWithProviders(<ProductGrid />, { products: mockProducts });
      
      const priceSelect = screen.getByDisplayValue('All Prices');
      fireEvent.change(priceSelect, { target: { value: '0-5' } });
      
      await waitFor(() => {
        expect(screen.getByText('Apple Juice')).toBeInTheDocument();
        expect(screen.queryByText('Orange Juice')).not.toBeInTheDocument();
        expect(screen.queryByText('Carrot Juice')).not.toBeInTheDocument();
        expect(screen.queryByText('Green Detox')).not.toBeInTheDocument();
      });
    });

    test('filters by price range $5-10', async () => {
      renderWithProviders(<ProductGrid />, { products: mockProducts });
      
      const priceSelect = screen.getByDisplayValue('All Prices');
      fireEvent.change(priceSelect, { target: { value: '5-10' } });
      
      await waitFor(() => {
        expect(screen.getByText('Orange Juice')).toBeInTheDocument();
        expect(screen.getByText('Carrot Juice')).toBeInTheDocument();
        expect(screen.queryByText('Apple Juice')).not.toBeInTheDocument();
        expect(screen.queryByText('Green Detox')).not.toBeInTheDocument();
      });
    });

    test('filters by price range over $15', async () => {
      renderWithProviders(<ProductGrid />, { products: mockProducts });
      
      const priceSelect = screen.getByDisplayValue('All Prices');
      fireEvent.change(priceSelect, { target: { value: '15-999' } });
      
      await waitFor(() => {
        expect(screen.getByText('Green Detox')).toBeInTheDocument();
        expect(screen.queryByText('Orange Juice')).not.toBeInTheDocument();
        expect(screen.queryByText('Apple Juice')).not.toBeInTheDocument();
        expect(screen.queryByText('Carrot Juice')).not.toBeInTheDocument();
      });
    });
  });

  describe('Sorting Functionality', () => {
    test('sorts by name A-Z', async () => {
      renderWithProviders(<ProductGrid />, { products: mockProducts });
      
      const sortSelect = screen.getByDisplayValue('Name A-Z');
      fireEvent.change(sortSelect, { target: { value: 'name' } });
      
      await waitFor(() => {
        const products = screen.getAllByText(/Juice|Detox/);
        expect(products[0]).toHaveTextContent('Apple Juice');
        expect(products[1]).toHaveTextContent('Carrot Juice');
        expect(products[2]).toHaveTextContent('Green Detox');
        expect(products[3]).toHaveTextContent('Orange Juice');
      });
    });

    test('sorts by price low to high', async () => {
      renderWithProviders(<ProductGrid />, { products: mockProducts });
      
      const sortSelect = screen.getByDisplayValue('Name A-Z');
      fireEvent.change(sortSelect, { target: { value: 'price-low' } });
      
      await waitFor(() => {
        const products = screen.getAllByText(/Juice|Detox/);
        expect(products[0]).toHaveTextContent('Apple Juice');
        expect(products[1]).toHaveTextContent('Orange Juice');
        expect(products[2]).toHaveTextContent('Carrot Juice');
        expect(products[3]).toHaveTextContent('Green Detox');
      });
    });

    test('sorts by price high to low', async () => {
      renderWithProviders(<ProductGrid />, { products: mockProducts });
      
      const sortSelect = screen.getByDisplayValue('Name A-Z');
      fireEvent.change(sortSelect, { target: { value: 'price-high' } });
      
      await waitFor(() => {
        const products = screen.getAllByText(/Juice|Detox/);
        expect(products[0]).toHaveTextContent('Green Detox');
        expect(products[1]).toHaveTextContent('Carrot Juice');
        expect(products[2]).toHaveTextContent('Orange Juice');
        expect(products[3]).toHaveTextContent('Apple Juice');
      });
    });

    test('sorts by popularity', async () => {
      renderWithProviders(<ProductGrid />, { products: mockProducts });
      
      const sortSelect = screen.getByDisplayValue('Name A-Z');
      fireEvent.change(sortSelect, { target: { value: 'popularity' } });
      
      await waitFor(() => {
        const products = screen.getAllByText(/Juice|Detox/);
        expect(products[0]).toHaveTextContent('Green Detox');
        expect(products[1]).toHaveTextContent('Orange Juice');
        expect(products[2]).toHaveTextContent('Apple Juice');
        expect(products[3]).toHaveTextContent('Carrot Juice');
      });
    });
  });

  describe('Combined Filtering', () => {
    test('combines search and category filters', async () => {
      renderWithProviders(<ProductGrid />, { products: mockProducts });
      
      const searchInput = screen.getByPlaceholderText('Search juices...');
      const categorySelect = screen.getByDisplayValue('All Categories');
      
      fireEvent.change(searchInput, { target: { value: 'fresh' } });
      fireEvent.change(categorySelect, { target: { value: 'fruit' } });
      
      await waitFor(() => {
        expect(screen.getByText('Orange Juice')).toBeInTheDocument();
        expect(screen.getByText('Apple Juice')).toBeInTheDocument();
        expect(screen.queryByText('Carrot Juice')).not.toBeInTheDocument();
        expect(screen.queryByText('Green Detox')).not.toBeInTheDocument();
      });
    });

    test('combines all filters together', async () => {
      renderWithProviders(<ProductGrid />, { products: mockProducts });
      
      const searchInput = screen.getByPlaceholderText('Search juices...');
      const categorySelect = screen.getByDisplayValue('All Categories');
      const priceSelect = screen.getByDisplayValue('All Prices');
      const sortSelect = screen.getByDisplayValue('Name A-Z');
      
      fireEvent.change(searchInput, { target: { value: 'juice' } });
      fireEvent.change(categorySelect, { target: { value: 'fruit' } });
      fireEvent.change(priceSelect, { target: { value: '5-10' } });
      fireEvent.change(sortSelect, { target: { value: 'price-low' } });
      
      await waitFor(() => {
        expect(screen.getByText('Apple Juice')).toBeInTheDocument();
        expect(screen.getByText('Orange Juice')).toBeInTheDocument();
        expect(screen.queryByText('Carrot Juice')).not.toBeInTheDocument();
        expect(screen.queryByText('Green Detox')).not.toBeInTheDocument();
      });
    });
  });

  describe('URL Integration', () => {
    test('loads search query from URL', async () => {
      mockQuery.search = 'orange';
      
      renderWithProviders(<ProductGrid />, { products: mockProducts });
      
      await waitFor(() => {
        expect(screen.getByText('Orange Juice')).toBeInTheDocument();
        expect(screen.queryByText('Apple Juice')).not.toBeInTheDocument();
      });
    });

    test('submits search to URL', async () => {
      renderWithProviders(<ProductGrid />, { products: mockProducts });
      
      const searchInput = screen.getByPlaceholderText('Search juices...');
      const form = searchInput.closest('form');
      
      fireEvent.change(searchInput, { target: { value: 'apple juice' } });
      fireEvent.submit(form);
      
      expect(mockPush).toHaveBeenCalledWith('/productGrid?search=apple%20juice');
    });
  });

  describe('Error Handling', () => {
    test('handles undefined products gracefully', () => {
      renderWithProviders(<ProductGrid />, { products: undefined });
      
      expect(screen.getByText('No products found')).toBeInTheDocument();
    });

    test('handles empty products array', () => {
      renderWithProviders(<ProductGrid />, { products: [] });
      
      expect(screen.getByText('No products found')).toBeInTheDocument();
    });

    test('handles products with missing properties', () => {
      const incompleteProducts = [
        { id: 1, name: 'Test Juice' },
        { id: 2, name: 'Another Juice', price: '5.99' },
      ];
      
      renderWithProviders(<ProductGrid />, { products: incompleteProducts });
      
      expect(screen.getByText('Test Juice')).toBeInTheDocument();
      expect(screen.getByText('Another Juice')).toBeInTheDocument();
    });
  });
}); 