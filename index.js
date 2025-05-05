// index.js

import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from react-dom/client
import App from './src/App.js';
import { ThemeProvider } from 'styled-components';
import { AppProvider } from './src/context/context.js';  // Import the Context Provider
import theme from './src/theme.js';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot

root.render(
  <AppProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </AppProvider>
);
