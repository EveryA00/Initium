import React from "react";
import { Styled } from './styledComponents.js'

const Contact = ({ children, title }) => {
  return (
    <Styled.Contact className="min-h-screen flex flex-col bg-gray-100">
       {/* Header */}
       <header className="bg-blue-600 text-white p-6 text-2xl font-bold text-center shadow-md">
        {title || "Contact Us"}
      </header>

      {/* Contact Form Section */}
      <section className="p-10 bg-white shadow-md rounded-lg mx-6 mt-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Get in Touch</h1>
        <p className="text-lg text-gray-600 text-center mb-6">
          We'd love to hear from you! Whether you have a question or feedback, reach out to us below.
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-800 font-semibold mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              className="p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-800 font-semibold mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              className="p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col col-span-2">
            <label htmlFor="message" className="text-gray-800 font-semibold mb-2">Message</label>
            <textarea
              id="message"
              placeholder="Your Message"
              rows="5"
              className="p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold col-span-2 transition transform hover:scale-105 hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Contact Information Section */}
      <section className="p-10 bg-gray-50 shadow-md rounded-lg mx-6 mt-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Our Contact Information</h2>
        <div className="flex flex-col items-center text-center">
          <p className="text-lg text-gray-600 mb-4">Feel free to reach out via any of the methods below:</p>
          <p className="text-lg text-gray-800 mb-2"><strong>📞 Phone:</strong> (123) 456-7890</p>
          <p className="text-lg text-gray-800 mb-2"><strong>✉️ Email:</strong> contact@myapp.com</p>
          <p className="text-lg text-gray-800 mb-4"><strong>📍 Address:</strong> 123 Business Ave, City, Country</p>
        </div>
      </section>

      {/* Map Section */}
      <section className="p-10 bg-white shadow-md rounded-lg mx-6 mt-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Our Location</h2>
        <div className="w-full h-64 bg-gray-300 rounded-lg">
          {/* You can embed a map using Google Maps iframe or another map provider */}
          <iframe
            src="https://www.google.com/maps/embed/v1/place?q=123+Business+Ave,+City,+Country&key=YOUR_GOOGLE_MAP_API_KEY"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      </section>
    </Styled.Contact>
  );
};

export default Contact;