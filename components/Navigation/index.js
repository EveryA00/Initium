import React, { useContext, useState } from "react";
import {  NavBar,
  NavList,
  NavItem,
  NavLink,
  CartLink,
  CartWrapper,
  Label,
  ItemCount,
  Icon,
  SearchContainer,
  SearchInput,
  SearchButton } from "./styledComponents";

import LoginButton from "../LoginButton";
import { ProductsContext } from "../../context/ProductsContext";

const Navigation = () => {
  const { cart } = useContext(ProductsContext);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Calculate total items in cart (sum of all quantities)
  const itemCount = cart?.reduce((total, item) => total + (item.quantity || 1), 0) || 0;
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to product grid with search query
      window.location.href = `/productGrid?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  return (
    <NavBar>
      <NavList>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/productGrid">Shop</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/about">About</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/contact">Contact</NavLink>
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
    </NavBar>
  );
};

export default Navigation;
