import React, { useContext } from 'react';
import { Styled } from '../styles/bagStyledComponents.js'
import { ProductsContext } from '../context/ProductsContext.js';

const Bag = () => {
  const { cart, removeFromCart, clearCart } = useContext(ProductsContext);
  const total = cart?.reduce((sum, item) => sum + parseFloat(item?.price.replace('$', '')) * item?.quantity, 0);

  return (
    <Styled.Container>
    {cart.length === 0 ? (
      <Styled.EmptyBag>Your bag is empty 🍋</Styled.EmptyBag>
    ) : (
      <Styled.ItemsContainer>
        {cart.map((item) => (
          <Styled.CartItem key={item?.id}>
            <Styled.Image src={item?.image} alt={item?.name} />
            <Styled.Details>
              <Styled.Name>{item?.name}</Styled.Name>
              <Styled.Price>${parseFloat(item?.price.replace('$', '')).toFixed(2)}</Styled.Price>
              <Styled.Quantity>Quantity: {item?.quantity}</Styled.Quantity>
            </Styled.Details>
          </Styled.CartItem>
        ))}
      </Styled.ItemsContainer>
    )}

    {cart.length > 0 && (
      <Styled.Summary>
        <Styled.SummaryTitle>Summary</Styled.SummaryTitle>
        <Styled.Total>Total: ${total.toFixed(2)}</Styled.Total>
        <Styled.CheckoutButton>Checkout</Styled.CheckoutButton>
      </Styled.Summary>
    )}
  </Styled.Container>
  );
};

export default Bag;