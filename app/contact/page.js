"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactUs() {
  const serviceNumber = "9322272933"; // WhatsApp number

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${serviceNumber}`, "_blank");
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    // Construct message text
    const text = `Hello! I am ${name} (${email}). %0A%0A${message}`;

    // Open WhatsApp chat with pre-filled message
    window.open(
      `https://wa.me/${serviceNumber}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-yellow-500 drop-shadow-lg">
        MAX WHOLESALER
      </h1>

      {/* Contact Info */}
      <motion.div
        className="grid md:grid-cols-2 gap-8 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-4 hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Contact Info
          </h2>
          <p className="text-gray-700">
            <span className="font-semibold">Shop:</span> 8530619001
          </p>
          <p
            className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-green-500 transition"
            onClick={handleWhatsAppClick}
          >
            <span className="font-semibold">Service:</span> WhatsApp 9322272933
          </p>
          <p className="text-gray-700 mt-4">
            <span className="font-semibold">Branches:</span> Soegaon | Shendurni
            | Jalgaon
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-4 hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Services / Products
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Solar Zatka Machine</li>
            <li>Solar Camera</li>
            <li>Electronics Gadgets</li>
            <li>LED Battery</li>
            <li>Sprey Pump</li>
          </ul>
        </div>
      </motion.div>

      {/* Contact Form + Map Side by Side */}
      <motion.div
        className="grid md:grid-cols-2 gap-8 items-start mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
          {/* Google Map - left */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden h-[400px] hover:shadow-2xl transition duration-300"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.8885819930747!2d75.6211204!3d20.5926072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd979c447b91113%3A0x94401379dcbf52af!2sBhairavnath%20Tyres%20And%20Battery!5e0!3m2!1sen!2sin!4v1758814050850!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
        {/* Contact Form - right */}
        <motion.form
          onSubmit={handleSendMessage}
          className="bg-gray-50 p-8 rounded-2xl overflow-hidden h-[400px] text-black shadow-lg flex flex-col gap-6 hover:shadow-2xl transition duration-300"
        >
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-1">
            Send a Message
          </h2>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none transition duration-300"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none transition duration-300"
            required
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none transition duration-300 resize-none"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-xl shadow hover:bg-yellow-600 transition duration-300"
          >
            Send Message
          </button>
        </motion.form>
        
      
      </motion.div>


      {/* WhatsApp Floating Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20.52 3.48a11.77 11.77 0 0 0-16.66 16.66l-1.6 5.88 5.88-1.6a11.77 11.77 0 0 0 12.38-20.94zm-8.52 16a9.32 9.32 0 0 1-5.03-1.42l-.36-.22-3.02.82.82-3.02-.23-.36a9.3 9.3 0 1 1 8.82 4.2z" />
          <path d="M15.67 14.85c-.2-.1-1.17-.58-1.35-.65-.18-.07-.31-.1-.44.1s-.51.65-.63.78c-.12.12-.25.14-.45.05s-.93-.34-1.77-1.1c-.66-.59-1.11-1.31-1.24-1.45-.13-.14-.01-.22.09-.3.09-.09.2-.21.3-.31.1-.1.13-.17.2-.28.07-.12.03-.23-.01-.33-.05-.1-.44-1.07-.6-1.46-.16-.38-.32-.33-.44-.34-.12 0-.26 0-.4 0-.13 0-.33.05-.5.24s-.65.64-.65 1.56.66 1.8.75 1.93c.08.12 1.29 1.97 3.13 2.76.44.19.78.3 1.05.39.44.15.84.13 1.16.08.35-.05 1.17-.48 1.34-.95.16-.48.16-.9.12-.95-.04-.05-.18-.08-.37-.17z" />
        </svg>
      </button>
    </div>
  );
}
