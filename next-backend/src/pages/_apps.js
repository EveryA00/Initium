// pages/_app.js
import React, { useState } from 'react';
import GlobalStyle from '../styles/GlobalStyles.js';
import { ProductsProvider } from '../context/ProductsContext.js';
import Navigation from '../components/Navigation/index.js';
import Footer from '../components/Footer/index.js';

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState([]);

  return (
    <ProductsProvider>
      <GlobalStyle />
      <Navigation cart={cart} setCart={setCart} />
      <Component {...pageProps} />
      <Footer />
    </ProductsProvider>
  );
}

export default MyApp;
