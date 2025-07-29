import React, { useContext } from "react";
import {  NavBar,
  NavList,
  NavItem,
  NavLink,
  CartLink,
  CartWrapper,
  Label,
  ItemCount,
  Icon } from "./styledComponents";

import LoginButton from "../LoginButton";
import { ProductsContext } from "../../context/ProductsContext";

const Navigation = () => {
  const { cart } = useContext(ProductsContext);
  
  // Calculate total items in cart (sum of all quantities)
  const itemCount = cart?.reduce((total, item) => total + (item.quantity || 1), 0) || 0;
  
  return (
    <NavBar>
      <NavList>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/about">About</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/contact">Contact</NavLink>
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
