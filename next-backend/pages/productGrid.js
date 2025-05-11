import React, { useContext, useState, useEffect } from "react";
import { GridContainer } from "../styles/productGridStyledComponents";
import ProductCard from "./productCard";
import { ProductsContext } from "../context/ProductsContext";

const ProductGrid = () => {
  const { products, cart, removeFromCart, addToCart, updateQuantity } = useContext(ProductsContext) || {}; // Safe destructuring

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // If products are undefined or the array is empty, show loading state
  useEffect(() => {
    if (!products) {
      return <p>Loading products...</p>; // Show loading message while products are being fetched
    }
  }, [products])
  
  // Handling error message when fetching products
  if (error) {
    return <p>Error fetching products: {error}</p>;
  }

  return (
    <GridContainer>
      {products && products?.length > 0 ? (
        products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            cart={cart}
            updateQuantity={updateQuantity}
          />
        ))
      ) : (
        <p>No products available</p> // If no products are available, show a message
      )}
    </GridContainer>
  );
};

export default ProductGrid;
