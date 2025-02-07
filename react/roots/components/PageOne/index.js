import React from "react";
import Footer from 'react/roots/components/Footer'

const PageContainer = ({ children, title }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-xl font-bold">
        {title || "My App"}
      </header>
      <main className="flex-grow p-6">{children}</main>
     <Footer></Footer>
    </div>
  );
};

export default PageContainer;