import React, { useContext, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import LoginButton from "../LoginButton";
import { ProductsContext } from "../../context/ProductsContext";

// Animations
const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Styled Components
const NavBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: ${slideDown} 0.6s ease-out;
  transition: ${({ theme }) => theme.transitions.normal};
  
  &.scrolled {
    background: rgba(255, 255, 255, 1);
    backdrop-filter: blur(20px);
  }
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
`;

const Logo = styled.div`
  font-family: ${({ theme }) => theme.typography.display};
  font-size: ${({ theme }) => theme.typography.h4};
  font-weight: ${({ theme }) => theme.typography.bold};
  color: #1B3D1A;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: #2E5A27;
  }
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled.a`
  color: #1B3D1A;
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.medium};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: #2E5A27;
    background: rgba(46, 90, 39, 0.1);
  }
  
  &:focus {
    outline: 3px solid #2E5A27;
    outline-offset: 2px;
    color: #2E5A27;
    background: rgba(46, 90, 39, 0.1);
  }
`;

const SearchContainer = styled.div`
  position: relative;
  
  form {
    display: flex;
    align-items: center;
  }
`;

const SearchInput = styled.input`
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  color: #000000;
  font-size: ${({ theme }) => theme.typography.fontSizeSmall};
  width: 160px;
  transition: ${({ theme }) => theme.transitions.fast};
  
  &::placeholder {
    color: rgba(0, 0, 0, 0.7);
  }
  
  &:focus {
    outline: none;
    border-color: #3E2723;
    background: rgba(255, 255, 255, 1);
    width: 180px;
  }
`;

const SearchButton = styled.button`
  background: #2E5A27;
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  width: 32px;
  height: 32px;
  margin-left: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  
  &:hover {
    background: #1B3D1A;
    transform: scale(1.05);
  }
  
  &:focus {
    outline: 3px solid #2E5A27;
    outline-offset: 2px;
    background: #1B3D1A;
  }
`;

const CartLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #1B3D1A;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: ${({ theme }) => theme.transitions.fast};
  position: relative;
  
  &:hover {
    background: rgba(46, 90, 39, 0.1);
    color: #2E5A27;
  }
  
  &:focus {
    outline: 3px solid #2E5A27;
    outline-offset: 2px;
    color: #2E5A27;
    background: rgba(46, 90, 39, 0.1);
  }
`;

const CartWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Icon = styled.div`
  width: 18px;
  height: 18px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' /%3E%3C/svg%3E") no-repeat center;
  background-size: contain;
`;

const Label = styled.span`
  font-weight: ${({ theme }) => theme.typography.medium};
  font-size: ${({ theme }) => theme.typography.fontSizeSmall};
  color: #1B3D1A;
`;

const ItemCount = styled.span`
  position: absolute;
  top: -3px;
  right: -3px;
  background: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.textWhite};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: ${({ theme }) => theme.typography.bold};
  animation: ${fadeIn} 0.3s ease-out;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #1B3D1A;
  font-size: 24px;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

const Navigation = () => {
  const { cart } = useContext(ProductsContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  
  const itemCount = cart?.reduce((total, item) => total + (item.quantity || 1), 0) || 0;
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/productGrid?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  return (
    <NavBar className={isScrolled ? 'scrolled' : ''}>
      <NavContainer>
                  <Logo>Heritage Juices Co.</Logo>
        
        <NavList>
          <NavItem>
            <NavLink href="/productGrid">Shop</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/about">About</NavLink>
          </NavItem>
          <NavItem>
            <SearchContainer>
              <form onSubmit={handleSearch}>
                <SearchInput
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  aria-label="Search for juices"
                />
                <SearchButton type="submit" aria-label="Search">
                  🔍
                </SearchButton>
              </form>
            </SearchContainer>
          </NavItem>
          <NavItem>
            <CartLink href="/bag">
              <CartWrapper>
                <Icon />
                <Label>Bag</Label>
                {itemCount > 0 && <ItemCount>{itemCount}</ItemCount>}
              </CartWrapper>
            </CartLink>
          </NavItem>
          <NavItem>
            <LoginButton />
          </NavItem>
        </NavList>
        
        <MobileMenuButton>
          ☰
        </MobileMenuButton>
      </NavContainer>
    </NavBar>
  );
};

export default Navigation;
