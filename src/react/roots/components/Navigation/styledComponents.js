import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


const NavBar = styled.nav`
  background-color: #1e40af; /* Blue-600 */
  padding: 1rem;
`;

const NavList = styled.ul`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  font-size: 1.1rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease-in-out, transform 0.2s ease;

  &:hover {
    color: #93c5fd; /* Lighter blue on hover */
    transform: scale(1.1);
  }
`;


export const Styled = {
    NavBar,
    NavList,
    NavItem,
    NavLink
  };