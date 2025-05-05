import React, { useContext } from "react";
import { Styled } from "./styledComponents";
import ProductCard from "../ProductCard";
import { ProductsContext } from "../../../../context/ProductsContext";

const ProductGrid = () => {
  const { products, cart, removeFromCart, addToCart, updateQuantity } =
    useContext(ProductsContext); // Access products from context
  return (
    <Styled.GridContainer>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          cart={cart}
          updateQuantity={updateQuantity}
        />
      ))}
    </Styled.GridContainer>
  );
};

export default ProductGrid;
