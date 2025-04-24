import React, { createContext, useState, useEffect } from 'react';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
              const response = await fetch('http://localhost:3000/api/products');  // Correct URL to the backend API
              const data = await response.json();
              setProducts(data);
            } catch (error) {
              console.error('Error fetching products:', error);
            }
          };             
    
        fetchProducts();
    }, []);

    return (
        <ProductsContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductsContext.Provider>
    );
};
