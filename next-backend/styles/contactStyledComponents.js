// styles/contactStyledComponents.js
import { styled } from 'styled-components';

// Main container
export const ContactContain = styled.div`
  background: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xl};
`;

// Hero section
export const HeroSection = styled.section`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xxxl} ${({ theme }) => theme.spacing.xl};
  text-align: center;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%);
    z-index: 1;
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
`;

export const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.h1};
  font-weight: ${({ theme }) => theme.typography.bold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.surface};
`;

export const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizeLarge};
  opacity: 0.9;
  line-height: ${({ theme }) => theme.typography.lineHeightLoose};
`;

// Content section
export const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

// Contact form
export const ContactForm = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xxl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

export const FormTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.h3};
  font-weight: ${({ theme }) => theme.typography.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

export const FormDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.fontSizeLarge};
  line-height: ${({ theme }) => theme.typography.lineHeight};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: ${({ theme }) => theme.typography.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize};
`;

export const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize};
  transition: all ${({ theme }) => theme.transitions.fast};
  background: ${({ theme }) => theme.colors.surface};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

export const TextArea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize};
  transition: all ${({ theme }) => theme.transitions.fast};
  background: ${({ theme }) => theme.colors.surface};
  resize: vertical;
  min-height: 120px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

export const SubmitButton = styled.button`
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
  min-width: 200px;
  align-self: center;
  
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

// Contact info
export const ContactInfo = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.borderLight} 0%, ${({ theme }) => theme.colors.surface} 100%);
  padding: ${({ theme }) => theme.spacing.xxl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

export const InfoTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.h3};
  font-weight: ${({ theme }) => theme.typography.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

export const InfoDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.fontSizeLarge};
  line-height: ${({ theme }) => theme.typography.lineHeight};
`;

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

export const InfoIcon = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  min-width: 40px;
  text-align: center;
`;

export const InfoContent = styled.div`
  flex: 1;
`;

export const InfoLabel = styled.h4`
  font-weight: ${({ theme }) => theme.typography.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSizeLarge};
`;

export const InfoValue = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize};
  line-height: ${({ theme }) => theme.typography.lineHeight};
`;

// Map section
export const MapSection = styled.section`
  max-width: 1200px;
  margin: ${({ theme }) => theme.spacing.xxl} auto 0;
  padding: ${({ theme }) => theme.spacing.xxl};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

export const MapTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.h3};
  font-weight: ${({ theme }) => theme.typography.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.borderLight} 0%, ${({ theme }) => theme.colors.surface} 100%);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizeLarge};
`;

// Business hours
export const HoursSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: center;
`;

export const HoursTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.h4};
  font-weight: ${({ theme }) => theme.typography.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const HoursText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizeLarge};
  opacity: 0.9;
`;
