import { styled } from "styled-components";

export const ProductDetailCard = styled.div`
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const Img = styled.img`
  height: 450px;
  width: auto;
  max-width: 100%;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: transform ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: scale(1.02);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 300px;
    width: 100%;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

export const ProductSectionLeft = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  flex: 1;
`;

export const ProductSectionRight = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing.xl};
  flex: 1;
  
  h1 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.typography.h2};
    font-weight: ${({ theme }) => theme.typography.bold};
  }
  
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    line-height: ${({ theme }) => theme.typography.lineHeight};
    font-size: ${({ theme }) => theme.typography.fontSizeLarge};
  }
  
  .price {
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.typography.h3};
    font-weight: ${({ theme }) => theme.typography.bold};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

export const Button = styled.button`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  color: ${({ theme }) => theme.colors.surface};
  border: none;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.fontSizeLarge};
  font-weight: ${({ theme }) => theme.typography.semibold};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;
  overflow: hidden;
  min-width: 200px;
  
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
