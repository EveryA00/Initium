import React, { useState } from "react";
import { Styled } from './styledComponents';

const ProductCard = ({ product, cart, setCart }) => {

  const isInCart = cart?.some((item) => item.id === product.id);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleRemoveFromCart = (product) => {
    setCart((prevCart) => prevCart?.filter((item) => item.id !== product.id));
  };

  return (
    <Styled.Card>
      <Styled.Img src={product?.image} alt={product?.name} />
      <h3>{product?.name}</h3>
      <p>{product?.price}</p>

      {isInCart ? (
        <Styled.RemoveButton onClick={() => handleRemoveFromCart(product)}>
          Remove From Cart
        </Styled.RemoveButton>
      ) : (
        <Styled.Button onClick={() => handleAddToCart(product)}>
          Add to Cart
        </Styled.Button>
      )}
    </Styled.Card>
  );
};

export default ProductCard;
