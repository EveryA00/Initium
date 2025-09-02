import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a Context
const AppContext = createContext();

// Context Provider Component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load user data from localStorage on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsLoggedIn(true);
        console.log('Loaded user from localStorage:', parsedUser);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Function to log in a user
  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    // Store in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Function to log out
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
