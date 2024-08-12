"use client";
import Socials from "@/components/widgets/Socials";
import React, { useState } from "react";
import ContactSvg from "./ContactSvg";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Thank you for your message! We'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setMessage("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="max-w-7xl mx-auto mt-20 pt-4 px-4 sm:px-6 md:px-8 border border-neutral-100 rounded-lg shadow-lg p-4"
    >
      <div className="mx-auto text-center">
        <h2 className="text-lg font-semibold p-2 w-fit mx-auto text-green-500">
          Contact
        </h2>
        <p className="font-bold text-5xl mt-2">Contact Us </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-16 mt-10">
        <ContactSvg />
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Error Message */}
          {message && (
            <div className="text-center lg:text-left text-sm mb-4">
              <p
                className={`text-${
                  message.includes("Thank you") ? "green" : "red"
                }-500`}
              >
                {message}
              </p>
            </div>
          )}

          <div className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm text-gray-600">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                rows="5"
                className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
              ></textarea>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <button
              type="submit"
              className={`rounded-full text-white font-semibold bg-green-500 py-4 px-6 shadow-md hover:bg-green-400 duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
      <Socials
        className="flex gap-4 justify-center items-center my-8"
        color="black"
      />
    </section>
  );
};

export default ContactForm;
