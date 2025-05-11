// pages/_app.js
import React from 'react';
import GlobalStyle from '../styles/GlobalStyles.js';
import { ProductsProvider } from '../context/ProductsContext.js';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {

  return (
    <ProductsProvider>
      <GlobalStyle />
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </ProductsProvider>
  );
}

export default MyApp;
