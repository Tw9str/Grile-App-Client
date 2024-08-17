"use client";
import React, { useState, useRef } from "react";
import { MdiEye, MdiEyeOff } from "@/components/dashboard/Icons";
import { useRouter } from "next/navigation";

const ResetPassword = ({ token }) => {
  const [formData, setFormData] = useState({
    newPassword: "",
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
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const router = useRouter();
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
    setMessage({});
    try {
      if (formData.newPassword !== formData.confirmPassword) {
        setMessage({ type: "error", text: "Parolele nu se potrivesc" });
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage({
          type: "success",
          text: "Parola a fost resetată cu succes.",
        });

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setMessage({
        type: "error",
        text: "A apărut o eroare. Vă rugăm să încercați din nou mai târziu.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-gray-950 my-3 text-4xl font-bold">
          Resetează Parola
        </h1>
        <p className="text-gray-600 text-sm">Introduceți parola nouă</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="space-y-2">
          <div className="space-y-2">
            <label
              htmlFor="newPassword"
              className="text-gray-600 block text-sm"
            >
              Parolă Nouă
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Parolă Nouă"
                className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
                onChange={handleInputChange}
                onFocus={() => setPasswordFocused(true)}
                aria-required="true"
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
                  {passwordValidation.length ? "✔" : "✖"} Cel puțin 8 caractere.
                </li>
                <li
                  className={`${
                    passwordValidation.uppercase
                      ? "text-green-600"
                      : "text-red-600"
                  } transition-colors duration-300`}
                >
                  {passwordValidation.uppercase ? "✔" : "✖"} Cel puțin o literă
                  majusculă.
                </li>
                <li
                  className={`${
                    passwordValidation.lowercase
                      ? "text-green-600"
                      : "text-red-600"
                  } transition-colors duration-300`}
                >
                  {passwordValidation.lowercase ? "✔" : "✖"} Cel puțin o literă
                  mică.
                </li>
                <li
                  className={`${
                    passwordValidation.digit ? "text-green-600" : "text-red-600"
                  } transition-colors duration-300`}
                >
                  {passwordValidation.digit ? "✔" : "✖"} Cel puțin o cifră.
                </li>
                <li
                  className={`${
                    passwordValidation.specialChar
                      ? "text-green-600"
                      : "text-red-600"
                  } transition-colors duration-300`}
                >
                  {passwordValidation.specialChar ? "✔" : "✖"} Cel puțin un
                  caracter special (de exemplu, !@#$%^&*).
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-gray-600 block text-sm"
            >
              Confirmă Parola Nouă
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirmă Parola Nouă"
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
              <p className="text-sm text-red-600">Parolele nu se potrivesc</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {message.text && (
            <p
              className={`text-sm text-center ${
                message.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message.text}
            </p>
          )}
          <div className="space-y-2">
            <button
              type="submit"
              className={`text-white w-full px-8 py-3 font-semibold rounded-md bg-green-500 hover:bg-green-400 duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Resetare..." : "Resetează Parola"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
