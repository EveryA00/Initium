import React, { createContext, useContext, useState } from 'react';

// Create a Context
const AppContext = createContext();

// Context Provider Component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to log in a user
  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  // Function to log out
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AppContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook to Use Context
export const useAppContext = () => {
  return useContext(AppContext);
};
