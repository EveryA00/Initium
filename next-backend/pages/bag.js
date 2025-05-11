import React, { useContext } from 'react';
import { Container,
  Title,
  RemoveButton,
  EmptyBag,
  Content,
  ItemsContainer,
  CartItem,
  Image,
  Details,
  Name,
  Price,
  Quantity,
  Summary,
  SummaryTitle,
  Total,
  CheckoutButton } from '../styles/bagStyledComponents.js'
import { ProductsContext } from '../context/ProductsContext.js';

const Bag = () => {
  const { cart, removeFromCart, clearCart } = useContext(ProductsContext);
  const total = cart?.reduce((sum, item) => sum + parseFloat(item?.price.replace('$', '')) * item?.quantity, 0);

  return (
    <Container>
    {cart.length === 0 ? (
      <EmptyBag>Your bag is empty 🍋</EmptyBag>
    ) : (
      <ItemsContainer>
        {cart.map((item) => (
          <CartItem key={item?.id}>
            <Image src={item?.image} alt={item?.name} />
            <Details>
              <Name>{item?.name}</Name>
              <Price>${parseFloat(item?.price.replace('$', '')).toFixed(2)}</Price>
              <Quantity>Quantity: {item?.quantity}</Quantity>
            </Details>
          </CartItem>
        ))}
      </ItemsContainer>
    )}

    {cart.length > 0 && (
      <Summary>
        <SummaryTitle>Summary</SummaryTitle>
        <Total>Total: ${total.toFixed(2)}</Total>
        <CheckoutButton>Checkout</CheckoutButton>
      </Summary>
    )}
  </Container>
  );
};

export default Bag;