import styled from "styled-components";
import { Link } from "react-router-dom";

// Card container
export const Styled = {
  QuantityContainer: styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  `,
  QuantityControls: styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1rem 0;
  `,
  QuantityButton: styled.button`
    padding: 0.25rem 0.75rem;
    background: #f3f4f6;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #e5e7eb;
    }
  `,

  Quantity: styled.span`
    font-size: 1.2rem;
    min-width: 30px;
    text-align: center;
  `,

  Card: styled.div`
    width: 100%; // Set the width of the card
    height: auto; // Allow the height to adjust based on content
    padding: 16px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    overflow: hidden; // Prevent any overflow
    margin: 0 auto;
  `,

  // Link for routing
  Link: styled(Link)`
    text-decoration: none;
  `,

  // Button style
  Button: styled.button`
    padding: 8px 16px;
    background-color: #45a049;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #45a049;
    }
  `,

    // Button style
    RemoveButton: styled.button`
    padding: 8px 16px;
    background-color:rgb(223, 83, 83);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%;

    &:hover {
      background-color:#c82121;
    }
  `,


  // Styled image tag for Product Card
  Img: styled.img`
    height: 300px;
    width: 100%;
    object-fit: cover; // Ensures the image fills the container without distortion
    border-radius: 4px; // Optional: adds a border-radius to the image
  `,
};
