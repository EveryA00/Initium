import React, { useState, useEffect, useRef } from "react";
import { Styled } from "./styledComponents.js";
import { useRouter } from "next/router";

const LoginButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const menuRef = useRef(null);

  // Check authentication status on component mount and when localStorage changes
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setIsLoggedIn(true);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          handleLogout();
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    // Check on mount
    checkAuthStatus();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically to catch any localStorage changes
    const interval = setInterval(checkAuthStatus, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setShowMenu(false);
    router.push('/');
  };

  const handleClick = () => {
    if (isLoggedIn) {
      // If logged in, toggle the user menu
      setShowMenu(!showMenu);
    } else {
      // If not logged in, go to sign in page
      router.push("/signIn");
    }
  };

  const handleProfileClick = () => {
    setShowMenu(false);
    router.push('/profile');
  };

  return (
    <div ref={menuRef} style={{ position: 'relative' }}>
      <Styled.LoginButton
        onClick={handleClick}
        isLoggedIn={isLoggedIn}
      >
        {isLoggedIn ? (
          <>
            <span>👤</span>
            <span>{user?.name || 'User'}</span>
            <span>▼</span>
          </>
        ) : (
          <>
            <span>🔐</span>
            <span>Sign In</span>
          </>
        )}
      </Styled.LoginButton>

      {isLoggedIn && showMenu && (
        <Styled.UserMenu>
          <Styled.UserInfo>
            Signed in as {user?.email}
          </Styled.UserInfo>
          <Styled.MenuItem onClick={handleProfileClick}>
            👤 My Profile
          </Styled.MenuItem>
          <Styled.MenuItem onClick={handleLogout}>
            🚪 Sign Out
          </Styled.MenuItem>
        </Styled.UserMenu>
      )}
    </div>
  );
};

export default LoginButton;
