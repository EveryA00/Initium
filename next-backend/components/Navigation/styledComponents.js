import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link'; // Import Link from next/link
import { styled, withConfig } from "styled-components";


export const NavBar = styled.nav`
  background-color: #1e40af; /* Blue-600 */
  padding: 1rem;
`;

export const NavList = styled.ul`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const NavItem = styled.li`
  font-size: 1.1rem;
`;

export const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease-in-out, transform 0.2s ease;

  &:hover {
    color: #93c5fd; /* Lighter blue on hover */
    transform: scale(1.1);
  }
`;

export const CartLink = styled(Link)`
  color: #1e40af;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease-in-out, transform 0.2s ease;

  &:hover {
    color:rgb(44, 74, 171); /* Lighter blue on hover */
    transform: scale(1.1);
  }
`;
export const CartWrapper = styled.div`
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

export const Icon = styled(FaShoppingCart)`
  font-size: 1.4rem;
  margin-right: 0.5rem;
`;

export const ItemCount = styled.span`
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

export const Label = styled.span`
  font-weight: 500;
`;