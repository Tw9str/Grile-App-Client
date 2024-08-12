"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import Breadcrumb from "@/components/widgets/Breadcrumb";

export default function Layout({ children }) {
  const token = useSelector((state) => state.auth.token);

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
