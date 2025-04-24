import React from "react";
import { Styled } from "./styledComponents";

import LoginButton from "../LoginButton";

const Navigation = ({ cart }) => {
  const itemCount = cart?.length > 0 && cart?.length;
  return (
    <Styled.NavBar>
      <Styled.NavList>
        <Styled.NavItem>
          <Styled.NavLink to="/">Home</Styled.NavLink>
        </Styled.NavItem>
        <Styled.NavItem>
          <Styled.NavLink to="/about">About</Styled.NavLink>
        </Styled.NavItem>
        <Styled.NavItem>
          <Styled.NavLink to="/contact">Contact</Styled.NavLink>
        </Styled.NavItem>
        <Styled.NavItem>
          <Styled.CartLink to="/bag">
            <Styled.CartWrapper>
              <Styled.Icon />
              <Styled.Label>Cart</Styled.Label>
              {itemCount > 0 && <Styled.ItemCount>{itemCount}</Styled.ItemCount>}
            </Styled.CartWrapper>
          </Styled.CartLink>
        </Styled.NavItem>
        <Styled.NavItem>
          <LoginButton />
        </Styled.NavItem>
      </Styled.NavList>
    </Styled.NavBar>
  );
};

export default Navigation;
