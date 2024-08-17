"use client";
import Link from "next/link";
import { useState } from "react";

function RequestResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/request-reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setMessage({
          type: "success",
          text:
            data.message || "Verifică-ți emailul pentru link-ul de resetare.",
        });
      } else {
        setMessage({
          type: "error",
          text:
            data.message || "A apărut o eroare. Vă rugăm să încercați din nou.",
        });
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setMessage({
        type: "error",
        text: "A apărut o eroare. Vă rugăm să încercați din nou.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-gray-950 my-3 text-4xl font-bold">
          Solicitare resetare parolă
        </h1>
        <p className="text-gray-600 text-sm">
          Introdu adresa ta de email pentru a reseta parola
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="space-y-2">
          <label htmlFor="email" className="text-gray-600 block text-sm">
            Adresa de email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleInputChange}
            placeholder="example@domain.com"
            className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
            required
          />
        </div>
        <div className="space-y-2">
          <button
            type="submit"
            className={`text-white w-full px-8 py-3 font-semibold rounded-md bg-green-500 hover:bg-green-400 duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Se trimite..." : "Trimite"}
          </button>
          {message && (
            <p
              className={`text-sm text-center ${
                message.type === "error" ? "text-red-500" : "text-green-600"
              }`}
            >
              {message.text}
            </p>
          )}
          <p className="text-gray-600 px-6 text-sm text-center">
            Vrei să te autentifici?{" "}
            <Link href="/login" className="text-gray-950 hover:underline">
              Autentificare
            </Link>
            .
          </p>
        </div>
      </form>
    </>
  );
}

export default RequestResetPassword;
