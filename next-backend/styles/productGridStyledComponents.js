import { styled } from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: ${({ theme }) => theme.spacing.lg};
    padding: ${({ theme }) => theme.spacing.lg};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const FilterContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacing.xl};
  margin: ${({ theme }) => theme.spacing.xl} auto;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    padding: ${({ theme }) => theme.spacing.lg};
    margin: ${({ theme }) => theme.spacing.lg} auto;
  }
`;

export const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const FilterLabel = styled.label`
  font-weight: ${({ theme }) => theme.typography.semibold};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize};
`;

export const SearchBar = styled.form`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
  
  input {
    flex: 1;
    padding: ${({ theme }) => theme.spacing.md};
    border: none;
    outline: none;
    font-size: ${({ theme }) => theme.typography.fontSize};
    font-family: inherit;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    
    &::placeholder {
      color: ${({ theme }) => theme.colors.textLight};
    }
  }
  
  button {
    padding: ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surface};
    border: none;
    cursor: pointer;
    font-size: ${({ theme }) => theme.typography.fontSize};
    transition: all ${({ theme }) => theme.transitions.fast};
    
    &:hover {
      background: ${({ theme }) => theme.colors.primaryDark};
    }
  }
`;

export const FilterSelect = styled.select`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize};
  font-family: inherit;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight}20;
  }
`;

export const SortSelect = styled(FilterSelect)`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  border-color: ${({ theme }) => theme.colors.primary};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
  
  &:focus {
    background: ${({ theme }) => theme.colors.primaryDark};
    border-color: ${({ theme }) => theme.colors.primaryDark};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight}20;
  }
`;

export const NoResults = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textSecondary};
  
  h3 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  p {
    font-size: ${({ theme }) => theme.typography.fontSizeLarge};
  }
`;