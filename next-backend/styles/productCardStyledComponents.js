import { styled } from "styled-components";

// Professional quantity controls
export const QuantityContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.md} 0;
  background: ${({ theme }) => theme.colors.borderLight};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const QuantityButton = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize};
  font-weight: ${({ theme }) => theme.typography.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  min-width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.surface};
    border-color: ${({ theme }) => theme.colors.primaryLight};
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const Quantity = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizeLarge};
  font-weight: ${({ theme }) => theme.typography.semibold};
  min-width: 40px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

// Professional card design
export const Card = styled.div`
  width: 100%;
  height: auto;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  overflow: hidden;
  margin: 0 auto;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  transition: all ${({ theme }) => theme.transitions.normal};
  position: relative;
  
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
`;

// Professional button styling
export const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.success} 0%, ${({ theme }) => theme.colors.primary} 100%);
  color: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.typography.medium};
  font-size: ${({ theme }) => theme.typography.fontSize};
  transition: all ${({ theme }) => theme.transitions.fast};
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.md};
  position: relative;
  overflow: hidden;
  
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
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Professional remove button styling
export const RemoveButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.error} 0%, ${({ theme }) => theme.colors.warning} 100%);
  color: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.typography.medium};
  font-size: ${({ theme }) => theme.typography.fontSize};
  transition: all ${({ theme }) => theme.transitions.fast};
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.md};
  position: relative;
  overflow: hidden;
  
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
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Professional image styling
export const Img = styled.img`
  height: 300px;
  width: 100%;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: transform ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: scale(1.02);
  }
`;