import React from "react";
import { Styled } from '../styles/productCardStyledComponents';

const ProductCard = ({ product, cart, addToCart, removeFromCart, updateQuantity }) => {
  const isInCart = cart?.some((item) => item.id === product.id);
  const cartItem = cart?.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 1; // Always up-to-date from cart

  const handleIncrease = () => {
    updateQuantity(product, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product, quantity - 1);
    }
  };

  return (
    <Styled.Card>
      <Styled.Img src={product?.image} alt={product?.name} />
      <h3>{product?.name}</h3>
      <p>{product?.price}</p>

      {isInCart ? (
        <Styled.QuantityContainer>
          <Styled.QuantityControls>
            <Styled.QuantityButton onClick={handleDecrease}>-</Styled.QuantityButton>
            <Styled.Quantity>{quantity}</Styled.Quantity>
            <Styled.QuantityButton onClick={handleIncrease}>+</Styled.QuantityButton>
          </Styled.QuantityControls>
          <Styled.RemoveButton onClick={() => removeFromCart(product.id)}>
            Remove From Cart
          </Styled.RemoveButton>
        </Styled.QuantityContainer>
      ) : (
        <Styled.Button onClick={() => addToCart(product)}>
          Add to Cart
        </Styled.Button>
      )}
    </Styled.Card>
  );
};

export default ProductCard;
