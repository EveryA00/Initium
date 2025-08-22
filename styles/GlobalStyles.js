import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Modern CSS Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.typography.body};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.typography.fontSize};
    line-height: ${({ theme }) => theme.typography.lineHeight};
    font-weight: ${({ theme }) => theme.typography.regular};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.heading};
    font-weight: ${({ theme }) => theme.typography.semibold};
    line-height: ${({ theme }) => theme.typography.lineHeightTight};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text};
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.h1};
    font-weight: ${({ theme }) => theme.typography.bold};
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.h2};
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.h3};
  }

  h4 {
    font-size: ${({ theme }) => theme.typography.h4};
  }

  h5 {
    font-size: ${({ theme }) => theme.typography.h5};
  }

  h6 {
    font-size: ${({ theme }) => theme.typography.h6};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    line-height: ${({ theme }) => theme.typography.lineHeight};
  }

  /* Links */
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.fast};
    
    &:hover {
      color: ${({ theme }) => theme.colors.primaryDark};
    }
  }

  /* Smooth scrolling for anchor links */
  html {
    scroll-behavior: smooth;
  }

  /* Buttons */
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    transition: all ${({ theme }) => theme.transitions.fast};
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Form elements */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  /* Focus states */
  *:focus {
    outline: 3px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
  
  /* Skip to main content link for screen readers */
  .skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.textWhite};
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 10000;
  }
  
  .skip-link:focus {
    top: 6px;
  }
  
  /* Reduce motion for users who prefer it */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Selection */
  ::selection {
    background-color: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.surface};
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.borderLight};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.textLight};
  }
`;

export default GlobalStyle;
