import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import { styled } from "styled-components";

export const NavBar = styled.nav`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

export const NavList = styled.ul`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing.lg};
    flex-wrap: wrap;
  }
`;

export const NavItem = styled.li`
  font-size: ${({ theme }) => theme.typography.fontSizeLarge};
  font-weight: ${({ theme }) => theme.typography.medium};
`;

export const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.surface};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.semibold};
  transition: all ${({ theme }) => theme.transitions.fast};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.surface};
    transition: width ${({ theme }) => theme.transitions.fast};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.accentLight};
    transform: translateY(-1px);
    
    &::after {
      width: 100%;
    }
  }
`;

export const CartLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.semibold};
  transition: all ${({ theme }) => theme.transitions.fast};
`;

export const CartWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  text-decoration: none;
  color: inherit;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.surface};
  transition: all ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};

  &:hover {
    background: ${({ theme }) => theme.colors.borderLight};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

export const Icon = styled(FaShoppingCart)`
  font-size: ${({ theme }) => theme.typography.fontSizeLarge};
  margin-right: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
`;

export const ItemCount = styled.span`
  position: absolute;
  top: -10px;
  right: -10px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.error} 0%, ${({ theme }) => theme.colors.warning} 100%);
  color: ${({ theme }) => theme.colors.surface};
  font-size: ${({ theme }) => theme.typography.fontSizeSmall};
  font-weight: ${({ theme }) => theme.typography.bold};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  min-width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 2px solid ${({ theme }) => theme.colors.surface};
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export const Label = styled.span`
  font-weight: ${({ theme }) => theme.typography.medium};
  color: ${({ theme }) => theme.colors.text};
`;