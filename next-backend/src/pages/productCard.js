import React from "react";
import {
  QuantityContainer,
  QuantityButton,
  QuantityControls,
  Quantity,
  Card,
  Img,
  Button,
  RemoveButton,
  CardLink,
} from "../styles/productCardStyledComponents";

const ProductCard = ({
  product,
  cart,
  addToCart,
  removeFromCart,
  updateQuantity,
}) => {
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
    <Card>
      <Img src={product?.image} alt={product?.name} />
      <h3>{product?.name}</h3>
      <p>{product?.price}</p>

      {isInCart ? (
        <QuantityContainer>
          <QuantityControls>
            <QuantityButton onClick={handleDecrease}>
              -
            </QuantityButton>
            <Quantity>{quantity}</Quantity>
            <QuantityButton onClick={handleIncrease}>
              +
            </QuantityButton>
          </QuantityControls>
          <RemoveButton onClick={() => removeFromCart(product.id)}>
            Remove From Cart
          </RemoveButton>
        </QuantityContainer>
      ) : (
        <Button onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      )}
    </Card>
  );
};

export default ProductCard;
