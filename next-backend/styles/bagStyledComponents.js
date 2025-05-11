import { styled, withConfig } from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
  display: grid; 
  grid-template-columns: 2fr 1fr;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

 // Button style
 export const RemoveButton = styled.button`
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
`

export const EmptyBag = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 4rem;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-right: 1rem;
`;

export const CartItem = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  background-color: #fff;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 0.5rem;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.h2`
  font-size: 1.2rem;
  margin: 0;
`;

export const Price = styled.span`
  color: #4caf50;
  font-weight: bold;
  margin-top: 0.5rem;
`;

export const Quantity = styled.span`
  font-size: 0.9rem;
  color: #555;
  margin-top: 0.5rem;
`;

export const Summary = styled.div`
  padding: 2rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  background-color: #f9f9f9;
  height: fit-content;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const SummaryTitle = styled.h2`
  font-size: 1.5rem;
`;

export const Total = styled.p`
  font-size: 1.3rem;
  margin-top: 1rem;
`;

export const CheckoutButton = styled.button`
  margin-top: 1.5rem;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  background-color: #1e40af;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #1c3aa9;
  }
`;