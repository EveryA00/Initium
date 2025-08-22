import React, { createContext, useState, useEffect } from 'react';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null); // Error state

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('heritage-juices-cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
        console.log('Loaded cart from localStorage:', parsedCart);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('heritage-juices-cart', JSON.stringify(cart));
      console.log('Saved cart to localStorage:', cart);
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        if (data.success && data.products) {
          setProducts(data.products);
        } else {
          throw new Error('Invalid response format');
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);  // Store error message
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    console.log('Adding to cart:', product);
    setCart(prev => {
      console.log('Previous cart state:', prev);
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        const updatedCart = prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        console.log('Updated existing item in cart:', updatedCart);
        return updatedCart;
      }
      // Ensure price is always a number
      const normalizedProduct = {
        ...product,
        price: typeof product.price === 'number' ? product.price : parseFloat(product.price || 0),
        quantity: 1
      };
      const newCart = [...prev, normalizedProduct];
      console.log('Added new item to cart:', newCart);
      return newCart;
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (product, newQuantity) => {
    setCart(prev => 
      prev.map(item =>
        item.id === product.id
          ? { 
              ...item, 
              quantity: newQuantity,
              // Ensure price is always a number
              price: typeof item.price === 'number' ? item.price : parseFloat(item.price || 0)
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <ProductsContext.Provider value={{
      products,
      cart,
      loading,  // Provide loading state
      error,    // Provide error state
      setProducts,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </ProductsContext.Provider>
  );
};
