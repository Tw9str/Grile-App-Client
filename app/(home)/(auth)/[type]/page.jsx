"use client";
import React from "react";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import { useSelector } from "react-redux";
import { notFound, redirect } from "next/navigation";
import RequestResetPassword from "@/components/auth/RequestResetPassword";
import ResetPassword from "@/components/auth/ResetPassword";

export default function Auth({ params, searchParams }) {
  const type = params.type;
  const key = searchParams.key;
  const token = useSelector((state) => state.auth.token);

  if (token) {
    redirect("/dashboard", "push");
  }

  const renderAuthComponent = () => {
    switch (type) {
      case "login":
        return <Login />;
      case "register":
        return <Register />;
      case "request-reset-password":
        return <RequestResetPassword />;
      case "reset-password":
        return <ResetPassword token={key} />;
      default:
        return notFound();
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col max-w-md mx-auto mt-20 p-6 rounded-md sm:p-10">
      {renderAuthComponent()}
    </div>
  );
}
