import React from "react";
import styled from "styled-components";

// Social Media Icons as SVG Components
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.98.245-1.297.49l-1.297-1.297c.245-.49.49-.98.49-1.297 0-.49-.245-.98-.49-1.297l1.297-1.297c.49.245.98.49 1.297.49.49 0 .98-.245 1.297-.49l1.297 1.297c-.245.49-.49.98-.49 1.297 0 .49.245.98.49 1.297l-1.297 1.297c-.49-.245-.98-.49-1.297-.49z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

// Styled Components
const FooterContainer = styled.footer`
  background: #2E5A27;
  color: #ffffff;
  padding: 4rem 0 2rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #F5E6D3;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 0.8rem;
  }
  
  a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    font-weight: 500;
    
    &:hover {
      color: #F5E6D3;
      transform: translateX(5px);
    }
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: 0.8rem;
    font-weight: 400;
  }
`;

const CompanyInfo = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 2px solid rgba(245, 230, 211, 0.2);
  
  h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 0.5rem;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: -0.02em;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1rem;
    margin-bottom: 1.5rem;
    font-weight: 300;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #F5E6D3;
    color: #2E5A27;
    transform: translateY(-3px);
  }
  
  &:focus {
    outline: 3px solid #F5E6D3;
    outline-offset: 2px;
    background: #F5E6D3;
    color: #2E5A27;
  }
`;

const Copyright = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(245, 230, 211, 0.2);
  font-weight: 400;
  
  a {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    margin-left: 0.5rem;
    transition: all 0.3s ease;
    
    &:hover {
      color: #F5E6D3;
    }
  }
`;

const ContactInfo = styled.div`
  p {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.8rem;
    font-weight: 400;
    
    &::before {
      content: '';
      width: 6px;
      height: 6px;
      background: #F5E6D3;
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
            <h3>Heritage Juices</h3>
            <p>
              Crafting premium, organic juices with traditional methods and 
              the finest natural ingredients. Every sip tells a story of heritage and quality.
            </p>
            <ContactInfo>
              <p>123 Heritage Lane, Organic City</p>
              <p>(555) 123-4567</p>
              <p>hello@heritagejuices.com</p>
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
          <h2>Heritage Juices</h2>
          <p>Preserving tradition, delivering freshness</p>
          
          <SocialLinks>
            <SocialLink href="#" aria-label="Visit our Facebook page">
              <FacebookIcon />
            </SocialLink>
            <SocialLink href="#" aria-label="Follow us on Instagram">
              <InstagramIcon />
            </SocialLink>
            <SocialLink href="#" aria-label="Follow us on Twitter">
              <TwitterIcon />
            </SocialLink>
            <SocialLink href="#" aria-label="Watch our videos on YouTube">
              <YouTubeIcon />
            </SocialLink>
          </SocialLinks>
        </CompanyInfo>

        {/* Copyright */}
        <Copyright>
          <p>&copy; {currentYear} Heritage Juices. All rights reserved.
             <a href="/privacy">Privacy Policy</a>
             <a href="/terms">Terms of Service</a>
          </p>
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
