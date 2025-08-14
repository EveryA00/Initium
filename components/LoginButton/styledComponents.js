import { styled } from "styled-components";

const LoginButton = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme, isLoggedIn }) => 
    isLoggedIn 
      ? 'rgba(255, 255, 255, 0.1)' 
      : `linear-gradient(135deg, ${theme.colors.success} 0%, ${theme.colors.primary} 100%)`};
  color: ${({ theme }) => theme.colors.surface};
  font-weight: ${({ theme }) => theme.typography.medium};
  font-size: 14px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  position: relative;
  border: 1px solid ${({ theme, isLoggedIn }) => 
    isLoggedIn ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};

  &:hover {
    background: ${({ theme, isLoggedIn }) => 
      isLoggedIn 
        ? 'rgba(255, 255, 255, 0.2)' 
        : `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.success} 100%)`};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const UserMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  min-width: 180px;
  z-index: 1000;
  margin-top: ${({ theme }) => theme.spacing.xs};
  overflow: hidden;
`;

const MenuItem = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.normal};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 14px;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;

const UserInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Styled = {
    LoginButton,
    UserMenu,
    MenuItem,
    UserInfo,
};