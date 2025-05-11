import React from "react";
import { Styled } from './styledComponents'

const Footer = () => {
  return (
    <Styled.FooterContainer>
      <Styled.FooterText>&copy; {new Date().getFullYear()} My App. All rights reserved.</Styled.FooterText>
    </Styled.FooterContainer>
  );
};

export default Footer;
