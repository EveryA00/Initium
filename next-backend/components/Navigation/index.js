import React from "react";
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

const Navigation = ({ cart }) => {
  const itemCount = cart?.length > 0 && cart?.length;
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
