import { styled } from "styled-components";

// Main container components
export const HomeContain = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  margin: 0;
  min-height: 100vh;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

// Professional hero section with green theme
export const HeroSection = styled.div`
  width: 100%;
  height: 70vh;
  min-height: 500px;
  background: linear-gradient(
    135deg,
    rgba(45, 90, 39, 0.9) 0%,
    rgba(104, 185, 132, 0.8) 100%
  ),
  url('../../../../images/juice/brand/heritageBG1.png') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
    z-index: 1;
  }
`;

export const HeroText = styled.div`
  background: rgba(255, 255, 255, 0.98);
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.xxl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  backdrop-filter: blur(20px);
  box-shadow: ${({ theme }) => theme.shadows.xl};
  text-align: center;
  max-width: 600px;
  z-index: 2;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  
  h1 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.typography.h1};
    font-weight: ${({ theme }) => theme.typography.bold};
    line-height: 1.2;
  }
  
  p {
    font-size: ${({ theme }) => theme.typography.fontSizeLarge};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    line-height: ${({ theme }) => theme.typography.lineHeight};
  }
`;

// Professional button styling with green theme
export const ShopButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  color: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSizeLarge};
  font-weight: ${({ theme }) => theme.typography.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  box-shadow: ${({ theme }) => theme.shadows.md};
  position: relative;
  overflow: hidden;
  min-width: 160px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left ${({ theme }) => theme.transitions.normal};
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Professional section styling
export const Section = styled.div`
  margin: ${({ theme }) => theme.spacing.xxl} 0;
  width: 100%;
  
  h2 {
    text-align: center;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    position: relative;
    font-size: ${({ theme }) => theme.typography.h2};
    font-weight: ${({ theme }) => theme.typography.semibold};
    
    &::after {
      content: '';
      position: absolute;
      bottom: -${({ theme }) => theme.spacing.sm};
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
      border-radius: ${({ theme }) => theme.borderRadius.full};
    }
  }
`;

// Professional grid layout
export const JuiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

// Professional card design
export const JuiceCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-align: center;
  transition: all ${({ theme }) => theme.transitions.normal};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
  
  img {
    width: 120px;
    height: 120px;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    object-fit: cover;
    margin: 0 auto ${({ theme }) => theme.spacing.lg};
    box-shadow: ${({ theme }) => theme.shadows.sm};
    transition: transform ${({ theme }) => theme.transitions.normal};
    
    &:hover {
      transform: scale(1.05);
    }
  }
  
  h3 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.h5};
    font-weight: ${({ theme }) => theme.typography.semibold};
  }
  
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSizeSmall};
    line-height: ${({ theme }) => theme.typography.lineHeight};
  }
`;

// Professional price styling
export const Price = styled.p`
  font-weight: ${({ theme }) => theme.typography.bold};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.h5};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// Professional add to cart button
export const AddToCart = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.typography.medium};
  transition: all ${({ theme }) => theme.transitions.fast};
  width: 100%;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Professional testimonial section
export const TestimonialSection = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.borderLight} 0%, ${({ theme }) => theme.colors.surface} 100%);
  padding: ${({ theme }) => theme.spacing.xxl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin: ${({ theme }) => theme.spacing.xxl} 0;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

export const Testimonial = styled.div`
  font-style: italic;
  margin: ${({ theme }) => theme.spacing.md} 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizeLarge};
  line-height: ${({ theme }) => theme.typography.lineHeightLoose};
  
  &::before {
    content: '"';
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.primary};
    line-height: 1;
  }
`;

// Professional call to action section
export const CallToAction = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xxl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin: ${({ theme }) => theme.spacing.xl} 0;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  
  h2 {
    color: ${({ theme }) => theme.colors.surface};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    
    &::after {
      background: ${({ theme }) => theme.colors.surface};
    }
  }
  
  p {
    color: ${({ theme }) => theme.colors.surface};
    opacity: 0.9;
    font-size: ${({ theme }) => theme.typography.fontSizeLarge};
  }
`;