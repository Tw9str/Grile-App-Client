"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";
import Breadcrumb from "@/components/widgets/Breadcrumb";
import { setToken } from "@/state/authSlice";
import { useEffect } from "react";

export default function Layout({ children }) {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateUserDetails = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/users/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to update user details");

        const user = await res.json();
        dispatch(setToken({ token, user }));
      } catch (error) {
        console.error(error.message);
      }
    };

    updateUserDetails();
  }, []);

  if (!token) {
    redirect("/login");
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
