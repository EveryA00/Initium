import React from "react";
import { Styled } from './styledComponents.js'

const Bag = ({ children, title }) => {
  return (
    <Styled.Bag className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-xl font-bold">
        {title || "My App"}
      </header>
      <main className="flex-grow p-6">{children}</main>
    </Styled.Bag>
  );
};

export default Bag;