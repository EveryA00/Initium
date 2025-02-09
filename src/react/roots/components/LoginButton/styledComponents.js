import styled from "styled-components";
import { Link } from "react-router-dom";

// Styled component named StyledButton

const LoginButton = styled(Link)`
  padding: 10px 20px;
  background: linear-gradient(135deg, #28a745, #218838);
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #218838, #1e7e34);
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  }
`;

export const Styled = {
    LoginButton,
  };