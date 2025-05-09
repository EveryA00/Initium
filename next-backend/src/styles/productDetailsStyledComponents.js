import { styled, withConfig } from "styled-components";

// Card container

  export const ProductDetailCard = styled.div`
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem;
    max-width: fit-content;
  `
  // Styled image tag for Product Card
  export const Img = styled.img`
    height: 450px;
    width: auto;
    object-fit: cover; // Ensures the image fills the container without distortion
    border-radius: 4px; // Optional: adds a border-radius to the image
  `
  export const ProductSectionLeft = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  `
  export const ProductSectionRight = styled.div`
    text-align: left;
    display: flex ;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  `
  export const Button = styled.button`
    background: #ff9a9e;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 20px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background: #fad0c4;
    }
  `
