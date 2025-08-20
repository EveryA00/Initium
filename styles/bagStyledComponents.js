import { styled } from "styled-components";

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  padding-top: calc(80px + ${({ theme }) => theme.spacing.xl}); /* Add space for fixed navigation */
  max-width: 1200px;
  margin: 0 auto;
  display: grid; 
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
    padding-top: calc(80px + ${({ theme }) => theme.spacing.lg}); /* Add space for fixed navigation */
  }
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.h2};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  font-weight: ${({ theme }) => theme.typography.bold};
  
  &::after {
    content: '';
    position: absolute;
    bottom: -${({ theme }) => theme.spacing.sm};
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }
`;

export const RemoveButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.error} 0%, ${({ theme }) => theme.colors.warning} 100%);
  color: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.typography.medium};
  font-size: ${({ theme }) => theme.typography.fontSize};
  transition: all ${({ theme }) => theme.transitions.fast};
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.md};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left ${({ theme }) => theme.transitions.normal};
  }
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const EmptyBag = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSizeLarge};
  margin-top: ${({ theme }) => theme.spacing.xxxl};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
  grid-column: 1 / -1;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding-right: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-right: 0;
  }
`;

export const CartItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme }) => theme.colors.surface};
  align-items: center;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
    transform: translateY(-1px);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    text-align: center;
  }
`;

export const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: transform ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    transform: scale(1.05);
  }
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Name = styled.h2`
  font-size: ${({ theme }) => theme.typography.h5};
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.semibold};
`;

export const Price = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.bold};
  font-size: ${({ theme }) => theme.typography.fontSizeLarge};
`;

export const Quantity = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: ${({ theme }) => theme.spacing.md} 0;
  
  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.typography.fontSize};
  }
`;

export const QuantityButton = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ variant }) => 
    variant === 'decrease' 
      ? 'linear-gradient(135deg, #e53e3e 0%, #ed8936 100%)'
      : 'linear-gradient(135deg, #38a169 0%, #4caF50 100%)'
  };
  color: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.typography.bold};
  font-size: ${({ theme }) => theme.typography.fontSize};
  transition: all ${({ theme }) => theme.transitions.fast};
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const QuantityDisplay = styled.span`
  font-weight: ${({ theme }) => theme.typography.bold};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizeLarge};
  min-width: 40px;
  text-align: center;
`;

export const Summary = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.borderLight} 0%, ${({ theme }) => theme.colors.surface} 100%);
  height: fit-content;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.md};
  position: sticky;
  top: ${({ theme }) => theme.spacing.xl};
`;

export const SummaryTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.h4};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-weight: ${({ theme }) => theme.typography.semibold};
`;

export const Total = styled.p`
  font-size: ${({ theme }) => theme.typography.h5};
  margin-top: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.bold};
`;

export const CheckoutButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.fontSizeLarge};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  color: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.typography.semibold};
  transition: all ${({ theme }) => theme.transitions.fast};
  width: 100%;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left ${({ theme }) => theme.transitions.normal};
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const ClearAllButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.error} 0%, ${({ theme }) => theme.colors.warning} 100%);
  color: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSizeLarge};
  font-weight: ${({ theme }) => theme.typography.semibold};
  transition: all ${({ theme }) => theme.transitions.fast};
  width: 100%;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left ${({ theme }) => theme.transitions.normal};
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;