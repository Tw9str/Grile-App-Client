"use client";
import Socials from "@/components/widgets/Socials";
import React, { useState } from "react";
import ContactSvg from "./ContactSvg";

const ContactForm = () => {
  const [state, setState] = useState({
    formData: {
      name: "",
      email: "",
      message: "",
    },
    message: "",
    loading: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      formData: { ...prevState.formData, [name]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, loading: true, message: "" }));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(state.formData),
        }
      );

      const data = await response.json();
      setState((prevState) => ({
        ...prevState,
        message: data.success ? data.message : data.error,
        formData: data.success
          ? { name: "", email: "", message: "" }
          : prevState.formData,
        loading: false,
      }));
    } catch (error) {
      console.error("Error submitting form", error);
      setState((prevState) => ({
        ...prevState,
        message: "A apărut o eroare. Vă rugăm să încercați din nou mai târziu.",
        loading: false,
      }));
    }
  };

  const { formData, message, loading } = state;

  return (
    <section
      id="contact"
      className="max-w-7xl mx-auto mt-20 pt-4 px-4 sm:px-6 md:px-8 border border-neutral-100 rounded-lg shadow-lg p-4"
    >
      <div className="mx-auto text-center">
        <h2 className="text-lg font-semibold p-2 w-fit mx-auto text-green-500">
          Contact
        </h2>
        <p className="font-bold text-5xl mt-2">Contactaţi-ne</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-16 mt-10">
        <ContactSvg />
        <form className="space-y-8" onSubmit={handleSubmit}>
          {message && (
            <div className="text-center lg:text-left text-sm mb-4">
              <p
                className={`text-${
                  message.includes("succes") ? "green" : "red"
                }-500`}
              >
                {message}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm text-gray-600">
                Nume
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Numele tău"
                className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
              />
            </div>

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
                placeholder="Email-ul tău"
                className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm text-gray-600">
                Mesaj
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Mesajul tău"
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
              {loading ? "Se trimite..." : "Trimite mesajul"}
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
