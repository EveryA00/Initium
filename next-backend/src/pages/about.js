import React from "react";

const About = ({ children, title }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
           {/* Header */}
           <header className="bg-blue-600 text-white p-6 text-2xl font-bold text-center shadow-md">
        {title || "About Us"}
      </header>

      {/* Company Overview Section */}
      <section className="p-10 bg-white shadow-md rounded-lg mx-6 mt-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Who We Are</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
          We are a passionate team dedicated to building innovative solutions that solve real-world problems. Our goal is to provide top-tier services that elevate user experience across the globe.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold transition transform hover:scale-105 hover:bg-blue-700">
          Learn More
        </button>
      </section>

      {/* Mission Statement Section */}
      <section className="text-center p-10 bg-gray-50 mx-6 mt-10 rounded-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our mission is to empower businesses and individuals by providing reliable, scalable, and secure solutions that foster growth and innovation. We are committed to making a difference in the digital world.
        </p>
      </section>

      {/* Team Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-10">
        <div className="bg-white p-6 shadow-md rounded-lg text-center">
          <h3 className="text-xl font-semibold text-gray-800">👩‍💻 Jane Doe</h3>
          <p className="text-gray-600 mt-2">CEO & Founder</p>
          <p className="text-gray-500 mt-2">Jane is a visionary leader passionate about technology and innovation. She drives the company towards new horizons and ensures we remain ahead of the curve.</p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg text-center">
          <h3 className="text-xl font-semibold text-gray-800">👨‍💻 John Smith</h3>
          <p className="text-gray-600 mt-2">CTO</p>
          <p className="text-gray-500 mt-2">John is the mastermind behind our technical solutions. His expertise in development and infrastructure ensures we deliver high-quality, scalable products.</p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg text-center">
          <h3 className="text-xl font-semibold text-gray-800">👩‍💼 Emily Johnson</h3>
          <p className="text-gray-600 mt-2">COO</p>
          <p className="text-gray-500 mt-2">Emily oversees operations and helps streamline our processes to maximize efficiency. She ensures our teams stay aligned and achieve optimal results.</p>
        </div>
      </section>
    </div>
  );
};

export default About;