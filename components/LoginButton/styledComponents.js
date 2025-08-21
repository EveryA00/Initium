import { styled } from "styled-components";

const LoginButton = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme, isLoggedIn }) => 
    isLoggedIn 
      ? '#2E5A27' 
      : `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryLight} 100%)`};
  color: white;
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
    isLoggedIn ? '#1B3D1A' : 'transparent'};

  &:hover {
    background: ${({ theme, isLoggedIn }) => 
      isLoggedIn 
        ? '#1B3D1A' 
        : `linear-gradient(135deg, ${theme.colors.primaryDark} 0%, ${theme.colors.primary} 100%)`};
    transform: translateY(-1px);
  }

  &:focus {
    outline: 3px solid #1B3D1A;
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(0);
  }
`;

const UserMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid rgba(46, 90, 39, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  min-width: 180px;
  z-index: 1000;
  margin-top: ${({ theme }) => theme.spacing.xs};
  overflow: hidden;
`;

const MenuItem = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  color: #1B3D1A;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.normal};
  border-bottom: 1px solid rgba(46, 90, 39, 0.1);
  font-size: 14px;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(46, 90, 39, 0.05);
  }

  &:focus {
    outline: 2px solid #2E5A27;
    outline-offset: -2px;
    background: rgba(46, 90, 39, 0.05);
  }
`;

const UserInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: #F5E6D3;
  border-bottom: 1px solid rgba(46, 90, 39, 0.2);
  font-size: 12px;
  color: #2E5A27;
`;

export const Styled = {
    LoginButton,
    UserMenu,
    MenuItem,
    UserInfo,
};