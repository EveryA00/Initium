// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

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


const App = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await fetch("http://localhost:3000/api/products");
            const data = await response.json();
            setProducts(data);
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        };
    
        fetchProducts();
      }, []);

    return (
        <BrowserRouter>
            <GlobalStyle />
            <Navigation />
                <Routes>
                    <Route path="/about" element={<About />} />
                    <Route path="/bag" element={<Bag />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/" element={<Home products={products}/>} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/products" element={<ProductGrid products={products} setProducts={setProducts}/>} />
                    <Route path="/product/:productId" element={<ProductDetail products={products} setProducts={setProducts}/>} />

                </Routes>
            <Footer />
        </BrowserRouter>
    );
}
export default App;
