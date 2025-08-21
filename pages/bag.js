import React, { useContext } from 'react';
// Version: 2.0 - Fixed price.replace issue
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
  
  // Force cache refresh by adding a version parameter
  React.useEffect(() => {
    // Add a cache-busting parameter to force reload
    const currentUrl = window.location.href;
    if (!currentUrl.includes('v=')) {
      const separator = currentUrl.includes('?') ? '&' : '?';
      window.history.replaceState(null, '', `${currentUrl}${separator}v=${Date.now()}`);
    }
  }, []);
  
  // Debug logging to see what's in the cart
  console.log('Cart items:', cart);
  
  // Fixed price calculation - ensure price is treated as number
  const total = cart?.reduce((sum, item) => {
    console.log('Processing item:', item);
    console.log('Item price type:', typeof item?.price, 'Value:', item?.price);
    const price = typeof item?.price === 'number' ? item.price : parseFloat(item?.price || 0);
    const quantity = item?.quantity || 0;
    console.log('Calculated price:', price, 'Quantity:', quantity);
    return sum + (price * quantity);
  }, 0);

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
        <EmptyBag>Your bag is empty</EmptyBag>
      ) : (
        <Content>
          <ItemsContainer>
            {cart.map((item) => (
              <CartItem key={item?.id}>
                <Image src={item?.image} alt={item?.name} />
                <Details>
                  <Name>{item?.name}</Name>
                  <Price>${(typeof item?.price === 'number' ? item.price : parseFloat(item?.price || 0)).toFixed(2)}</Price>
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