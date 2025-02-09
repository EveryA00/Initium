import React from "react";
import { Styled } from './styledComponents.js'
import { useNavigate } from 'react-router-dom';
import { useAppContext} from "../../../../context/context.js";


const LoginButton = ({ children, title }) => {
  const { isLoggedIn, user, logout, login } = useAppContext();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/signin')
  }

  return (
    <Styled.LoginButton className="min-h-screen flex flex-col bg-gray-100">
      {isLoggedIn ? (
        <div>
          <span>Welcome, {user.name}</span>
          <button onClick={logout} className="ml-4 bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={handleClick} className="ml-4 bg-red-500 px-3 py-1 rounded">
        Sign In
      </button>
      )}
    </Styled.LoginButton>
  );
};

export default LoginButton;