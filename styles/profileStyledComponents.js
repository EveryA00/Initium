import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

export const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};

  h1 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 0.5rem;
    font-size: ${({ theme }) => theme.typography.h2};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  transition: transform ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 2rem;
    margin: 0 0 0.5rem 0;
    font-weight: ${({ theme }) => theme.typography.bold};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin: 0;
    font-size: ${({ theme }) => theme.typography.fontSizeSmall};
  }
`;

export const ProfileTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  overflow-x: auto;
`;

export const TabButton = styled.button`
  padding: 1rem 1.5rem;
  background: ${({ active, theme }) => 
    active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) => 
    active ? theme.colors.surface : theme.colors.text};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md} ${({ theme }) => theme.borderRadius.md} 0 0;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.typography.medium};
  transition: all ${({ theme }) => theme.transitions.normal};
  white-space: nowrap;

  &:hover {
    background: ${({ active, theme }) => 
      active ? theme.colors.primary : theme.colors.background};
    color: ${({ active, theme }) => 
      active ? theme.colors.surface : theme.colors.primary};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const TabContent = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

export const Section = styled.div`
  padding: 2rem;
`;

export const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  h2 {
    color: ${({ theme }) => theme.colors.primary};
    margin: 0;
    font-size: ${({ theme }) => theme.typography.h3};
  }
`;

export const OrderGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

export const OrderCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 1.5rem;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  h4 {
    color: ${({ theme }) => theme.colors.primary};
    margin: 0 0 0.5rem 0;
    font-size: ${({ theme }) => theme.typography.h5};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin: 0.25rem 0;
    font-size: ${({ theme }) => theme.typography.fontSizeSmall};
  }
`;

export const StatusBadge = styled.span`
  background: ${({ color }) => color};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.typography.medium};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const AccountForm = styled.form`
  display: grid;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: ${({ theme }) => theme.typography.medium};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.typography.fontSizeSmall};
  }
`;

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize};
  transition: border-color ${({ theme }) => theme.transitions.normal};
  background: ${({ disabled, theme }) => 
    disabled ? theme.colors.background : theme.colors.surface};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${({ variant, theme }) => 
    variant === 'outline' ? 'transparent' : theme.colors.primary};
  color: ${({ variant, theme }) => 
    variant === 'outline' ? theme.colors.primary : theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  font-size: ${({ theme }) => theme.typography.fontSize};

  &:hover:not(:disabled) {
    background: ${({ variant, theme }) => 
      variant === 'outline' ? theme.colors.primary : theme.colors.primaryDark};
    color: ${({ theme }) => theme.colors.surface};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  h3 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 2rem;
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: ${({ theme }) => theme.typography.fontSizeLarge};
  color: ${({ theme }) => theme.colors.primary};
`;

export const Alert = styled.div`
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  background: ${({ type, theme }) => 
    type === 'success' ? '#D4EDDA' : 
    type === 'error' ? '#F8D7DA' : 
    '#D1ECF1'};
  color: ${({ type, theme }) => 
    type === 'success' ? '#155724' : 
    type === 'error' ? '#721C24' : 
    '#0C5460'};
  border: 1px solid ${({ type, theme }) => 
    type === 'success' ? '#C3E6CB' : 
    type === 'error' ? '#F5C6CB' : 
    '#BEE5EB'};
  transition: opacity ${({ theme }) => theme.transitions.normal};

  &:hover {
    opacity: 0.8;
  }
`;

export const OrderDetails = styled.div`
  display: grid;
  gap: 2rem;

  h4 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1rem;
    font-size: ${({ theme }) => theme.typography.h5};
  }

  p {
    margin: 0.5rem 0;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ProductList = styled.div`
  display: grid;
  gap: 1rem;
`;

export const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};

  h5 {
    margin: 0 0 0.25rem 0;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.typography.fontSizeSmall};
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  h2 {
    margin: 0;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
`;

export const ModalFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`; 