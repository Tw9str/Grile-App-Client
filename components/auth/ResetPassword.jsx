"use client";
import React, { useState, useEffect, useRef } from "react";
import { MdiEye, MdiEyeOff } from "@/components/dashboard/Icons"; // Adjust the path based on your project structure

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const debounceTimeout = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    if (name === "newPassword") {
      validatePassword(value);
    }

    if (name === "confirmPassword" || name === "newPassword") {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        setPasswordMatch(
          name === "confirmPassword"
            ? formData.newPassword === value
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
    if (field === "newPassword") setShowNewPassword((prev) => !prev);
    else if (field === "confirmPassword")
      setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      if (formData.newPassword !== formData.confirmPassword) {
        setMessage("Passwords do not match.");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Your password has been reset successfully.");
        setFormData({ newPassword: "", confirmPassword: "" });
      } else {
        setMessage("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Error resetting password", error);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full p-4">
      <div className="w-full lg:w-2/3 p-8 my-8 mx-auto bg-white rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold my-3">Reset Password</h1>
          <p className="text-sm text-gray-600">Enter your new password</p>
        </div>
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Error Message */}
          {message && (
            <div className="text-center text-sm mb-4">
              <p
                className={`text-${
                  message.includes("successfully") ? "green" : "red"
                }-500`}
              >
                {message}
              </p>
            </div>
          )}

          <div className="space-y-4">
            {/* New Password */}
            <div className="space-y-4">
              <label
                htmlFor="newPassword"
                className="block text-sm text-gray-600"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  onFocus={() => setPasswordFocused(true)}
                  placeholder="New Password"
                  className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("newPassword")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showNewPassword ? (
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
                    {passwordValidation.length ? "✔" : "✖"} At least 8
                    characters long.
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
                      passwordValidation.digit
                        ? "text-green-600"
                        : "text-red-600"
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

            {/* Confirm New Password */}
            <div className="space-y-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm text-gray-600"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm New Password"
                  className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
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

          <div className="text-center">
            <button
              type="submit"
              className={`rounded-full text-white font-semibold bg-green-500 py-4 px-6 shadow-md hover:bg-green-400 duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
