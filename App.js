import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from "./src/react/roots/components/Navigation/index.js";
import Footer from "./src/react/roots/components/Footer/index.js";
import About from './src/react/roots/pages/About/index.js';
import Bag from './src/react/roots/pages/Bag/index.js';
import Contact from './src/react/roots/pages/Contact/index.js';
import Home from './src/react/roots/pages/Home/index.js';
import SignIn from './src/react/roots/pages/SignIn/index.js';
import ProductGrid from './src/react/roots/pages/ProductGrid/index.js';
import ProductDetail from './src/react/roots/pages/ProductDetailsPage/index.js';
import GlobalStyle from './src/styles/globalStyles.js';
import { ProductsProvider } from './src/context/ProductsContext'

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
