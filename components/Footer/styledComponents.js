import { styled } from "styled-components";

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primaryDark} 0%, ${({ theme }) => theme.colors.primary} 100%);
  color: ${({ theme }) => theme.colors.surface};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  margin-top: auto;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.secondary}, ${({ theme }) => theme.colors.accent});
  }
`;

const FooterText = styled.p`
  margin: 0;
  opacity: 0.9;
  transition: opacity ${({ theme }) => theme.transitions.fast};
  font-weight: ${({ theme }) => theme.typography.medium};
  font-size: ${({ theme }) => theme.typography.fontSize};
  
  &:hover {
    opacity: 1;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  text-align: left;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.accentLight};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.h5};
    font-weight: ${({ theme }) => theme.typography.semibold};
  }
  
  p {
    color: ${({ theme }) => theme.colors.surface};
    opacity: 0.8;
    line-height: ${({ theme }) => theme.typography.lineHeight};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  
  a {
    color: ${({ theme }) => theme.colors.accentLight};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.fast};
    
    &:hover {
      color: ${({ theme }) => theme.colors.surface};
    }
  }
`;

export const Styled = {
    FooterContainer,
    FooterText,
    FooterContent,
    FooterSection
}