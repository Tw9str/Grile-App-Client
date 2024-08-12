"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { MdiEye, MdiEyeOff } from "@/components/dashboard/Icons";

const Profile = () => {
  const [initialFormData, setInitialFormData] = useState({
    firstname: "",
    lastname: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    username: "",
    email: "",
    role: "",
    plan: "",
  });

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    username: "",
    email: "",
    role: "",
    plan: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const debounceTimeout = useRef(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/users/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        const formDataFromServer = {
          firstname: data.firstname || "",
          lastname: data.lastname || "",
          username: data.username || "",
          email: data.email || "",
          role: data.role || "",
          plan: data.plan || "",
        };
        setInitialFormData(formDataFromServer);
        setFormData((prevFormData) => ({
          ...prevFormData,
          ...formDataFromServer,
        }));
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchData();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value || "", // Ensures the value is always a string
    }));

    // Check if any field has changed from the initial form data
    setIsChanged(
      Object.keys(formData).some(
        (key) => formData[key] !== initialFormData[key]
      )
    );

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
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const allPasswordRulesMet = () => {
    return (
      passwordValidation.length &&
      passwordValidation.uppercase &&
      passwordValidation.lowercase &&
      passwordValidation.digit &&
      passwordValidation.specialChar
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (formData.currentPassword && !formData.newPassword) {
      setMessage("New password must be provided to change the password.");
      setLoading(false);
      return;
    }

    if (!passwordMatch) {
      setMessage("New passwords do not match.");
      setLoading(false);
      return;
    }

    if (formData.newPassword && !allPasswordRulesMet()) {
      setMessage("New password does not meet all the requirements.");
      setLoading(false);
      return;
    }

    const updatedFields = {};
    if (formData.firstname) updatedFields.firstname = formData.firstname;
    if (formData.lastname) updatedFields.lastname = formData.lastname;
    if (formData.username) updatedFields.username = formData.username;
    if (formData.currentPassword)
      updatedFields.currentPassword = formData.currentPassword;
    if (formData.newPassword) updatedFields.newPassword = formData.newPassword;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/users/updateUser`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFields),
        }
      );

      const data = await response.json();
      setMessage(
        response.ok
          ? "Account updated successfully"
          : data.message || "An error occurred. Please try again later."
      );
    } catch (error) {
      console.error("Error updating user data", error);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
      setIsChanged(false);
    }
  };

  return (
    <div className="w-full lg:w-2/3 p-2 md:p-8 mx-auto bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold my-3">Account Overview</h1>
        <p className="text-sm text-gray-600">Update your profile details</p>
      </div>
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <label htmlFor="firstname" className="block text-sm text-gray-600">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname || ""}
              onChange={handleInputChange}
              placeholder="First Name"
              className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="lastname" className="block text-sm text-gray-600">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname || ""}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label
            htmlFor="currentPassword"
            className="block text-sm text-gray-600"
          >
            Current Password
          </label>
          <div className="relative">
            <input
              type={showPassword.currentPassword ? "text" : "password"}
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword || ""}
              onChange={handleInputChange}
              placeholder="Current Password"
              className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("currentPassword")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showPassword.currentPassword ? (
                <MdiEyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <MdiEye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <label htmlFor="newPassword" className="block text-sm text-gray-600">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword.newPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={formData.newPassword || ""}
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
              {showPassword.newPassword ? (
                <MdiEyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <MdiEye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
          <div
            className={`transition-opacity transform duration-300 ${
              passwordFocused
                ? "opacity-100 translate-y-0"
                : "max-w-0 max-h-0 opacity-0 translate-y-4"
            } text-sm`}
          >
            <ul className="space-y-1">
              <li
                className={`${
                  passwordValidation.length ? "text-green-600" : "text-red-600"
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

        <div className="space-y-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm text-gray-600"
          >
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword || ""}
              onChange={handleInputChange}
              placeholder="Confirm New Password"
              className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirmPassword")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showPassword.confirmPassword ? (
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <label htmlFor="username" className="block text-sm text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username || ""}
              onChange={handleInputChange}
              placeholder="Username"
              className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="email" className="block text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ""}
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <label htmlFor="role" className="block text-sm text-gray-600">
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role || ""}
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-100"
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="plan" className="block text-sm text-gray-600">
              Plan
            </label>
            <input
              type="text"
              id="plan"
              name="plan"
              value={formData.plan || ""}
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-100"
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className={`rounded-full text-white font-semibold bg-green-500 py-4 px-6 shadow-md hover:bg-green-400 duration-300 ${
              loading || !isChanged ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading || !isChanged}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          {message && (
            <p className="text-sm text-red-600 text-center mt-4">{message}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;
