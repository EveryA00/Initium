import React from "react";
import { Styled } from "./styledComponents.js";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../../src/context/context.js";

const LoginButton = ({ children, title }) => {
  const { isLoggedIn, user, logout, login } = useAppContext();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/signin");
  };

  return (
    <>
      {isLoggedIn ? (
        <Styled.LoginButton
          onClick={handleClick}
          className="min-h-screen flex flex-col bg-gray-100"
        >
          <span>Welcome, {user.name}</span>
          <span onClick={logout}>Logout</span>
        </Styled.LoginButton>
      ) : (
        <Styled.LoginButton
          onClick={handleClick}
          className="min-h-screen flex flex-col bg-gray-100"
        >
          <span>Sign In</span>
        </Styled.LoginButton>
      )}
    </>
  );
};

export default LoginButton;
