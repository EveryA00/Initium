import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './react/roots/components/Navigation/index.js';
import Footer from './react/roots/components/Footer/index.js';
import About from '../next-backend/src/pages/about.js';
import Bag from '../next-backend/src/pages/bag.js';
import Contact from '../next-backend/src/pages/contact.js';
import Home from '../next-backend/src/pages/index.js';
import SignIn from '../next-backend/src/pages/signIn.js';
import ProductGrid from '../next-backend/src/pages/productGrid.js';
import ProductDetail from '../next-backend/src/pages/productDetails.js';
import GlobalStyle from './styles/GlobalStyles.js';
import { ProductsProvider } from './context/ProductsContext.js';

const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <ProductsProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Navigation cart={cart} setCart={setCart} />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/bag" element={<Bag />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/products" element={<ProductGrid cart={cart} setCart={setCart} />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ProductsProvider>
  );
}

export default App;
