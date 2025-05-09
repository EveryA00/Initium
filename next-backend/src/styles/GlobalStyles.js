import { createGlobalStyle, withConfig  } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${({ theme }) => theme.typography.body};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.typography.fontSize};
    line-height: 1.5;
  }

  h1, h2, h3 {
    font-family: ${({ theme }) => theme.typography.heading};
  }
`;

export default GlobalStyle;
