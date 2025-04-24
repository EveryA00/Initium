import { FaShoppingCart } from 'react-icons/fa';
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
  align-items: center;
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

const CartLink = styled(Link)`
  color: #1e40af;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease-in-out, transform 0.2s ease;

  &:hover {
    color:rgb(44, 74, 171); /* Lighter blue on hover */
    transform: scale(1.1);
  }
`;
const CartWrapper = styled(Link)`
  display: flex;
  align-items: center;
  position: relative;
  text-decoration: none;
  color: inherit;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  background:rgb(240, 240, 240);
  transition: background 0.3s ease;

  &:hover {
    background: #e0e0e0;
  }
`;

const Icon = styled(FaShoppingCart)`
  font-size: 1.4rem;
  margin-right: 0.5rem;
`;

const ItemCount = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: #ff5252;
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 50%;
`;

const Label = styled.span`
  font-weight: 500;
`;


export const Styled = {
    NavBar,
    NavList,
    NavItem,
    NavLink,
    CartLink,
    CartWrapper,
    Label,
    ItemCount,
    Icon
  };