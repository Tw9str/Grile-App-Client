"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";
import Breadcrumb from "@/components/widgets/Breadcrumb";
import { setToken } from "@/state/authSlice";
import { useEffect } from "react";

export default function Layout({ children }) {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateUserDetails = async () => {
      try {
        if (!token || !user) {
          console.log("Token or user is missing.");
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/updateToken`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user }),
          }
        );

        if (!res.ok) throw new Error("Failed to update user details");

        const data = await res.json();

        dispatch(setToken({ token, user: data.user }));
      } catch (error) {
        console.log(error.message);
      }
    };

    if (token && user) {
      updateUserDetails();
    }
  }, []);

  if (!token) {
    redirect("/auth/login");
  }

  return (
    <main>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-1 md:p-4">
          <Breadcrumb />
          {children}
        </div>
      </div>
    </main>
  );
}
