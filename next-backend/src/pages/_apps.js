// pages/_app.js
import React from 'react';
import App from '../src/App';

function MyApp({ Component, pageProps }) {
  return <App {...pageProps} />;
}

export default MyApp;
