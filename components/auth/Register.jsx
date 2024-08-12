"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdiEye, MdiEyeOff } from "@/components/dashboard/Icons"; // Adjust the path based on your project structure

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const router = useRouter();
  const debounceTimeout = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    if (name === "password") {
      validatePassword(value);
    }

    if (name === "confirmPassword" || name === "password") {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        setPasswordMatch(
          name === "confirmPassword"
            ? formData.password === value
            : value === formData.confirmPassword
        );
      }, 300);
    }
  };

  const validatePassword = (password) => {
    setPasswordValidation({
      length: password.length >= 8 && password.length <= 128,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*]/.test(password),
    });
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") setShowPassword((prev) => !prev);
    else if (field === "confirmPassword")
      setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({});
    try {
      if (formData.password !== formData.confirmPassword) {
        setMessage({ password: ["Passwords do not match"] });
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (data.success) {
        router.push("/auth/login");
      } else {
        const formattedMessages = data.message.reduce((acc, error) => {
          const field = error.toLowerCase().includes("username")
            ? "username"
            : error.toLowerCase().includes("email")
            ? "email"
            : "password";
          if (!acc[field]) acc[field] = [];
          acc[field].push(error);
          return acc;
        }, {});
        setMessage(formattedMessages);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setMessage({ general: "An error occurred. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-gray-950 my-3 text-4xl font-bold">Register</h1>
        <p className="text-gray-600 text-sm">
          Create an account to access features
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="space-y-2">
          <div className="space-y-2">
            <label htmlFor="username" className="text-gray-600 block text-sm">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="user"
              className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
              onChange={handleInputChange}
              aria-required="true"
            />
            {message.username && (
              <p className="text-sm text-red-600">{message.username[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-gray-600 block text-sm">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@domain.com"
              className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
              onChange={handleInputChange}
              aria-required="true"
            />
            {message.email && (
              <p className="text-sm text-red-600">{message.email[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <div className="text-gray-600 flex justify-between mb-2">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
                onChange={handleInputChange}
                onFocus={() => setPasswordFocused(true)}
                aria-required="true"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("password")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? (
                  <MdiEyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <MdiEye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            <div
              className={`${
                passwordFocused
                  ? "opacity-100 translate-y-0"
                  : "max-w-0 max-h-0 opacity-0 translate-y-4"
              } text-sm transition-opacity transform transition-transform duration-300`}
            >
              <ul className="space-y-1">
                <li
                  className={`${
                    passwordValidation.length
                      ? "text-green-600"
                      : "text-red-600"
                  } transition-colors duration-300`}
                >
                  {passwordValidation.length ? "✔" : "✖"} At least 8 characters
                  long.
                </li>
                <li
                  className={`${
                    passwordValidation.uppercase
                      ? "text-green-600"
                      : "text-red-600"
                  } transition-colors duration-300`}
                >
                  {passwordValidation.uppercase ? "✔" : "✖"} At least one
                  uppercase letter.
                </li>
                <li
                  className={`${
                    passwordValidation.lowercase
                      ? "text-green-600"
                      : "text-red-600"
                  } transition-colors duration-300`}
                >
                  {passwordValidation.lowercase ? "✔" : "✖"} At least one
                  lowercase letter.
                </li>
                <li
                  className={`${
                    passwordValidation.digit ? "text-green-600" : "text-red-600"
                  } transition-colors duration-300`}
                >
                  {passwordValidation.digit ? "✔" : "✖"} At least one digit.
                </li>
                <li
                  className={`${
                    passwordValidation.specialChar
                      ? "text-green-600"
                      : "text-red-600"
                  } transition-colors duration-300`}
                >
                  {passwordValidation.specialChar ? "✔" : "✖"} At least one
                  special character (e.g., !@#$%^&*).
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-gray-600 block text-sm"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
                onChange={handleInputChange}
                aria-required="true"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirmPassword")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showConfirmPassword ? (
                  <MdiEyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <MdiEye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            {!passwordMatch && formData.confirmPassword && (
              <p className="text-sm text-red-600">Passwords do not match</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="space-y-2">
            <button
              type="submit"
              className={`text-white w-full px-8 py-3 font-semibold rounded-md bg-green-500 hover:bg-green-400 duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
            {message.general && (
              <p className="text-sm text-red-600 text-center">
                {message.general}
              </p>
            )}
          </div>
          <p className="text-gray-600 px-6 text-sm text-center">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-gray-950 hover:underline">
              Sign in
            </Link>
            .
          </p>
        </div>
      </form>
    </>
  );
}
