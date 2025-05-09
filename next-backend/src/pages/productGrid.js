import React, { useContext } from "react";
import { Styled } from "../styles/productGridStyledComponents";
import ProductCard from "./productCard";
import { ProductsContext } from "../../../src/context/ProductsContext";

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
