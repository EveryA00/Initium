// pages/_app.js
import { ProductsProvider } from '../context/ProductsContext.js';
import { AppProvider } from "../context/context.js";
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const MyApp = ({ Component, pageProps }) => {
  return (
    <AppProvider>
      <ProductsProvider>
        <Navigation />
        <Component {...pageProps} />
        <Footer />
      </ProductsProvider>
    </AppProvider>
  );
}

export default MyApp;
