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
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 2px solid rgba(46, 90, 39, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  animation: ${slideDown} 0.6s ease-out;
  transition: all 0.3s ease;
  
  &.scrolled {
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
  }
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`;

const Logo = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 900;
  color: #2E5A27;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  
  &:hover {
    color: #4A7C59;
    transform: scale(1.05);
  }
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled.a`
  color: #2E5A27;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &:hover {
    color: #ffffff;
    background: #2E5A27;
    transform: translateY(-2px);
  }
  
  &:focus {
    outline: 3px solid #2E5A27;
    outline-offset: 2px;
    color: #ffffff;
    background: #2E5A27;
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
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(46, 90, 39, 0.2);
  border-radius: 25px;
  padding: 0.5rem 1rem;
  color: #2E5A27;
  font-size: 0.9rem;
  width: 160px;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &::placeholder {
    color: rgba(46, 90, 39, 0.6);
  }
  
  &:focus {
    outline: none;
    border-color: #2E5A27;
    background: rgba(255, 255, 255, 1);
    width: 180px;
    box-shadow: 0 0 0 3px rgba(46, 90, 39, 0.1);
  }
`;

const SearchButton = styled.button`
  background: #2E5A27;
  color: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  margin-left: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  
  &:hover {
    background: #4A7C59;
    transform: scale(1.1);
  }
  
  &:focus {
    outline: 3px solid #2E5A27;
    outline-offset: 2px;
    background: #4A7C59;
  }
`;

const CartLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #2E5A27;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  position: relative;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &:hover {
    background: #2E5A27;
    color: #ffffff;
    transform: translateY(-2px);
  }
  
  &:focus {
    outline: 3px solid #2E5A27;
    outline-offset: 2px;
    color: #ffffff;
    background: #2E5A27;
  }
`;

const CartWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' /%3E%3C/svg%3E") no-repeat center;
  background-size: contain;
`;

const Label = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
  color: inherit;
`;

const ItemCount = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #F44336;
  color: #ffffff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  animation: ${fadeIn} 0.3s ease-out;
  border: 2px solid #ffffff;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #2E5A27;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 5px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(46, 90, 39, 0.1);
  }
  
  @media (max-width: 768px) {
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
        <Logo>Heritage Juices</Logo>
        
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
                  placeholder="Search juices..."
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
