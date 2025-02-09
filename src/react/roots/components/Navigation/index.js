import React from "react";
import { Styled } from './styledComponents'

import LoginButton from "../LoginButton";

const Navigation = () => {
  return (
    <Styled.NavBar>
      <Styled.NavList>
        <Styled.NavItem><Styled.NavLink to="/">Home</Styled.NavLink></Styled.NavItem>
        <Styled.NavItem><Styled.NavLink to="/about">About</Styled.NavLink></Styled.NavItem>
        <Styled.NavItem><Styled.NavLink to="/contact">Contact</Styled.NavLink></Styled.NavItem>
        <Styled.NavItem><Styled.NavLink to="/bag">Bag</Styled.NavLink></Styled.NavItem>
        <Styled.NavItem><LoginButton/></Styled.NavItem>
      </Styled.NavList>
    </Styled.NavBar>
  );
};

export default Navigation;
