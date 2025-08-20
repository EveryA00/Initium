import React from "react";
import styled from "styled-components";

// Styled Components
const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.gradients.primary};
  color: ${({ theme }) => theme.colors.textWhite};
  padding: ${({ theme }) => theme.spacing.xxxl} 0 ${({ theme }) => theme.spacing.xl};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const FooterSection = styled.div`
  h3 {
    font-size: ${({ theme }) => theme.typography.h5};
    font-weight: ${({ theme }) => theme.typography.semibold};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.accent};
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  
  a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: ${({ theme }) => theme.transitions.fast};
    font-size: ${({ theme }) => theme.typography.fontSizeSmall};
    
    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: ${({ theme }) => theme.typography.fontSizeSmall};
    line-height: 1.6;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const CompanyInfo = styled.div`
  text-align: center;
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  h2 {
    font-family: ${({ theme }) => theme.typography.display};
    font-size: ${({ theme }) => theme.typography.h4};
    font-weight: ${({ theme }) => theme.typography.bold};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.textWhite};
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: ${({ theme }) => theme.typography.fontSizeSmall};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.textWhite};
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.fast};
  font-size: 18px;
  
  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }
  
  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const Copyright = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: ${({ theme }) => theme.typography.fontSizeSmall};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const ContactInfo = styled.div`
  p {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    
    &::before {
      content: '';
      width: 4px;
      height: 4px;
      background: ${({ theme }) => theme.colors.accent};
      border-radius: 50%;
    }
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          {/* Company Info */}
          <FooterSection>
            <h3>Heritage Juices Co.</h3>
            <p>
              Crafting premium, organic juices with traditional methods and 
              the finest natural ingredients. Every sip tells a story of heritage and quality.
            </p>
            <ContactInfo>
              <p>📍 123 Heritage Lane, Organic City</p>
              <p>📞 (555) 123-4567</p>
              <p>✉️ hello@heritagejuices.com</p>
            </ContactInfo>
          </FooterSection>

          {/* Quick Links */}
          <FooterSection>
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/productGrid">All Juices</a></li>
              <li><a href="/about">Our Story</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/bag">Shopping Bag</a></li>
            </ul>
          </FooterSection>

          {/* Customer Service */}
          <FooterSection>
            <h3>Customer Service</h3>
            <ul>
              <li><a href="/shipping">Shipping Info</a></li>
              <li><a href="/returns">Returns & Refunds</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/support">Support</a></li>
              <li><a href="/track-order">Track Order</a></li>
            </ul>
          </FooterSection>

          {/* Company */}
          <FooterSection>
            <h3>Company</h3>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/press">Press</a></li>
              <li><a href="/wholesale">Wholesale</a></li>
              <li><a href="/sustainability">Sustainability</a></li>
            </ul>
          </FooterSection>
        </FooterGrid>

        {/* Company Branding */}
        <CompanyInfo>
          <h2>🍹 Heritage Juices Co.</h2>
          <p>Preserving tradition, delivering freshness</p>
          
          <SocialLinks>
            <SocialLink href="#" aria-label="Visit our Facebook page">
              📘
            </SocialLink>
            <SocialLink href="#" aria-label="Follow us on Instagram">
              📷
            </SocialLink>
            <SocialLink href="#" aria-label="Follow us on Twitter">
              🐦
            </SocialLink>
            <SocialLink href="#" aria-label="Watch our videos on YouTube">
              📺
            </SocialLink>
          </SocialLinks>
        </CompanyInfo>

        {/* Copyright */}
        <Copyright>
          <p>&copy; {currentYear} Heritage Juices Co. All rights reserved. | 
             <a href="/privacy" style={{ marginLeft: '8px', color: 'rgba(255, 255, 255, 0.6)' }}>Privacy Policy</a> | 
             <a href="/terms" style={{ marginLeft: '8px', color: 'rgba(255, 255, 255, 0.6)' }}>Terms of Service</a>
          </p>
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
