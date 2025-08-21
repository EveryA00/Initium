// pages/_app.js
import { ThemeProvider } from 'styled-components';
import { ProductsProvider } from '../context/ProductsContext.js';
import { AppProvider } from "../context/context.js";
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import GlobalStyle from '../styles/GlobalStyles';
import theme from '../styles/theme';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppProvider>
        <ProductsProvider>
          <Navigation />
          <main id="main-content">
            <Component {...pageProps} />
          </main>
          <Footer />
        </ProductsProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default MyApp;
