// pages/_app.js
import { ProductsProvider } from '../context/ProductsContext.js';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ProductsProvider>
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </ProductsProvider>
  );
}

export default MyApp;
