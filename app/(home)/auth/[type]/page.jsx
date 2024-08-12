"use client";
import React from "react";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import ResetPassword from "@/components/auth/ResetPassword";

export default function Auth({ params }) {
  const type = params.type;
  const token = useSelector((state) => state.auth.token);
  if (token) {
    redirect("/dashboard", "push");
  }
  return (
    <div className="bg-gray-50 flex flex-col max-w-md mx-auto mt-20 p-6 rounded-md sm:p-10">
      {type === "login" ? (
        <Login />
      ) : type === "register" ? (
        <Register />
      ) : (
        <ResetPassword />
      )}
    </div>
  );
}
