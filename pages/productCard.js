import React from "react";
import styled, { keyframes } from "styled-components";

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0.95);
  }
  to {
    transform: scale(1);
  }
`;

// Styled Components
const Card = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.glass};
  transition: ${({ theme }) => theme.transitions.normal};
  animation: ${fadeIn} 0.6s ease-out;
  position: relative;
  overflow: hidden;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.glassHover};
    transform: translateY(-8px);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme }) => theme.colors.gradients.accent};
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover::before {
    transform: scaleX(1);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  aspect-ratio: 1;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover::after {
    transform: translateX(100%);
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: ${({ theme }) => theme.transitions.normal};
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const ProductInfo = styled.div`
  text-align: center;
`;

const ProductName = styled.h3`
  font-size: ${({ theme }) => theme.typography.h4};
  font-weight: ${({ theme }) => theme.typography.semibold};
  color: ${({ theme }) => theme.colors.textDark};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  line-height: 1.3;
`;

const ProductDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizeSmall};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.5;
`;

const Price = styled.div`
  font-size: ${({ theme }) => theme.typography.h5};
  font-weight: ${({ theme }) => theme.typography.bold};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Button = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.gradients.accent};
  color: ${({ theme }) => theme.colors.textWhite};
  border: none;
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize};
  font-weight: ${({ theme }) => theme.typography.semibold};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.normal};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
  
  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const QuantityContainer = styled.div`
  animation: ${scaleIn} 0.3s ease-out;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const QuantityButton = styled.button`
  background: ${({ theme }) => theme.colors.gradients.primary};
  color: ${({ theme }) => theme.colors.textWhite};
  border: none;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSizeLarge};
  font-weight: ${({ theme }) => theme.typography.bold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
  
  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const Quantity = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizeLarge};
  font-weight: ${({ theme }) => theme.typography.semibold};
  color: ${({ theme }) => theme.colors.textDark};
  min-width: 40px;
  text-align: center;
`;

const RemoveButton = styled.button`
  width: 100%;
  background: transparent;
  color: ${({ theme }) => theme.colors.error};
  border: 2px solid ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizeSmall};
  font-weight: ${({ theme }) => theme.typography.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.textWhite};
    transform: translateY(-1px);
  }
  
  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.error};
    outline-offset: 2px;
  }
`;

const CategoryBadge = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.gradients.secondary};
  color: ${({ theme }) => theme.colors.textWhite};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSizeSmall};
  font-weight: ${({ theme }) => theme.typography.medium};
  text-transform: capitalize;
  z-index: 2;
`;

const ProductCard = ({
  product,
  cart,
  addToCart,
  removeFromCart,
  updateQuantity,
}) => {
  const isInCart = cart?.some((item) => item.id === product.id);
  const cartItem = cart?.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 1;

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
      <ImageContainer>
        <Img src={product?.image} alt={product?.name} />
        <CategoryBadge>{product?.category}</CategoryBadge>
      </ImageContainer>
      
      <ProductInfo>
        <ProductName>{product?.name}</ProductName>
        <ProductDescription>{product?.description}</ProductDescription>
        <Price>${(product?.price || 0).toFixed(2)}</Price>

        {isInCart ? (
          <QuantityContainer>
            <QuantityControls>
              <QuantityButton 
                onClick={handleDecrease}
                aria-label={`Decrease quantity of ${product?.name}`}
              >
                −
              </QuantityButton>
              <Quantity aria-label={`Quantity: ${quantity}`}>{quantity}</Quantity>
              <QuantityButton 
                onClick={handleIncrease}
                aria-label={`Increase quantity of ${product?.name}`}
              >
                +
              </QuantityButton>
            </QuantityControls>
            <RemoveButton 
              onClick={() => removeFromCart(product.id)}
              aria-label={`Remove ${product?.name} from cart`}
            >
              Remove from Cart
            </RemoveButton>
          </QuantityContainer>
        ) : (
          <Button 
            onClick={() => addToCart(product)}
            aria-label={`Add ${product?.name} to cart`}
          >
            Add to Cart
          </Button>
        )}
      </ProductInfo>
    </Card>
  );
};

export default ProductCard;
