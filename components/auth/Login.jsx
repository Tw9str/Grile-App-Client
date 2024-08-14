"use client";
import { useState } from "react";
import Link from "next/link";
import { setToken } from "@/state/authSlice";
import { useDispatch } from "react-redux";
import { MdiEye, MdiEyeOff } from "@/components/dashboard/Icons";

export default function Login() {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      setMessage(data.message);
      if (data.success) {
        dispatch(setToken(data));
      } else {
        setMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-gray-950 my-3 text-4xl font-bold">Autentificare</h1>
        <p className="text-gray-600 text-sm">
          Autentifică-te pentru a accesa contul tău
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="text-gray-600 block mb-2 text-sm"
            >
              Nume de utilizator
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="exemplu@domeniu.com"
              className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
              onChange={handleInputChange}
              aria-required="true"
            />
          </div>
          <div>
            <div className="text-gray-600 flex justify-between mb-2">
              <label htmlFor="password" className="text-sm">
                Parolă
              </label>
              <Link
                rel="noopener noreferrer"
                href="/auth/reset-password"
                className="text-gray-950 text-xs hover:underline"
              >
                Ai uitat parola?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
                onChange={handleInputChange}
                aria-required="true"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? (
                  <MdiEyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <MdiEye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {message && <p className="text-red-500">{message}</p>}
          <div>
            <button
              type="submit"
              className={`text-white w-full px-8 py-3 font-semibold rounded-md bg-green-500 hover:bg-green-400 duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Autentificare..." : "Autentificare"}
            </button>
          </div>
          <p className="text-gray-600 px-6 text-sm text-center">
            Nu ai încă un cont?{" "}
            <Link
              href="/auth/register"
              className="text-gray-950 hover:underline"
            >
              Creează unul
            </Link>
            !
          </p>
        </div>
      </form>
    </>
  );
}
