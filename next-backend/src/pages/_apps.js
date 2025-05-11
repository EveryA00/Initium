// pages/_app.js
import React, { useState } from 'react';
import GlobalStyle from '../styles/GlobalStyles.js';
import { ProductsProvider } from '../context/ProductsContext.js';
import Navigation from '../components/Navigation/index.js';
import Footer from '../components/Footer/index.js';

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
