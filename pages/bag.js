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
  QuantityButton,
  QuantityDisplay,
  Summary,
  SummaryTitle,
  Total,
  CheckoutButton,
  ClearAllButton } from '../styles/bagStyledComponents.js'
import { ProductsContext } from '../context/ProductsContext.js';

const Bag = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(ProductsContext);
  const total = cart?.reduce((sum, item) => sum + parseFloat(item?.price.replace('$', '')) * item?.quantity, 0);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item, newQuantity);
    }
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  return (
    <Container>
      <Title>Shopping Bag</Title>
      
      {cart.length === 0 ? (
        <EmptyBag>Your bag is empty 🍋</EmptyBag>
      ) : (
        <Content>
          <ItemsContainer>
            {cart.map((item) => (
              <CartItem key={item?.id}>
                <Image src={item?.image} alt={item?.name} />
                <Details>
                  <Name>{item?.name}</Name>
                  <Price>${parseFloat(item?.price.replace('$', '')).toFixed(2)}</Price>
                  <Quantity>
                    <span>Quantity: </span>
                    <QuantityButton 
                      variant="decrease"
                      onClick={() => handleQuantityChange(item, item.quantity - 1)}
                    >
                      -
                    </QuantityButton>
                    <QuantityDisplay>
                      {item?.quantity}
                    </QuantityDisplay>
                    <QuantityButton 
                      variant="increase"
                      onClick={() => handleQuantityChange(item, item.quantity + 1)}
                    >
                      +
                    </QuantityButton>
                  </Quantity>
                  <RemoveButton onClick={() => handleRemoveItem(item.id)}>
                    Remove Item
                  </RemoveButton>
                </Details>
              </CartItem>
            ))}
          </ItemsContainer>

          <Summary>
            <SummaryTitle>Summary</SummaryTitle>
            <Total>Total: ${total.toFixed(2)}</Total>
            <CheckoutButton>Checkout</CheckoutButton>
            <ClearAllButton onClick={clearCart}>
              Clear All Items
            </ClearAllButton>
          </Summary>
        </Content>
      )}
    </Container>
  );
};

export default Bag;