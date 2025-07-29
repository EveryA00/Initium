import { styled } from "styled-components";

const LoginButton = styled.div`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.success} 0%, ${({ theme }) => theme.colors.primary} 100%);
  color: ${({ theme }) => theme.colors.surface};
  font-weight: ${({ theme }) => theme.typography.semibold};
  text-transform: uppercase;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.normal};
  box-shadow: ${({ theme }) => theme.shadows.md};
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: inline-block;
  
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
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.success} 100%);
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

export const Styled = {
    LoginButton,
};