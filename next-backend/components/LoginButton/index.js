import React, { useContext } from "react";
import { Styled } from "./styledComponents.js";
import { useRouter } from "next/router";
import { useAppContext } from "../../context/context.js";

const LoginButton = () => {
    const context = useContext(useAppContext);
  
    if (!context) {
      return <p>Loading context...</p>; // or handle it some other way
    }
  const { isLoggedIn = false, user, logout, login } = context;
  const router = useRouter(); // Use Next.js useRouter hook

  const handleClick = () => {
    router.push("/signin"); // Navigate to /signin route
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
