import { styled, withConfig } from "styled-components";

const FooterContainer = styled.footer`
  background-color: #1f2937; /* Gray-800 */
  color: white;
  text-align: center;
  padding: 1rem;
  font-size: 1rem;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  margin-top: auto;
`;

const FooterText = styled.p`
  margin: 0;
  opacity: 0.8;
  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

export const Styled = {
    FooterContainer,
    FooterText
}