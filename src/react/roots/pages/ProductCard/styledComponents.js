import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Card container
export const Styled = {
  Card: styled.div`
    border: 1px solid #ccc;
    padding: 16px;
    text-align: center;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: translateY(-5px);
    }
  `,

  // Link for routing
  Link: styled(Link)`
    text-decoration: none;
  `,

  // Button style
  Button: styled.button`
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #45a049;
    }
  `
};
