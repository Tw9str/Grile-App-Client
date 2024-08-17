"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import NoData from "@/components/shared/NoData";
import ExamBox from "@/components/dashboard/ExamBox";
import LoadingSpinner from "@/components/widgets/LoadingSpinner";
import { useSelector } from "react-redux";
import PortalButton from "@/components/shared/buttons/PortalButton";

export default function Dashboard() {
  const [exams, setExams] = useState([]);
  const [premiumUsers, setPremiumUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingExams, setLoadingExams] = useState(true);
  const [loadingPremiumUsers, setLoadingPremiumUsers] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/exams`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch exams");
        }
        const data = await response.json();
        setExams(data.slice(0, 8));
      } catch (error) {
        console.error("Error fetching exams:", error);
      } finally {
        setLoadingExams(false);
      }
    };

    const fetchPremiumUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/users/premium`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch premium users");
        }
        const data = await response.json();
        setPremiumUsers(data);
      } catch (error) {
        console.error("Error fetching premium users:", error);
      } finally {
        setLoadingPremiumUsers(false);
      }
    };

    fetchExams();
    fetchPremiumUsers();
  }, []);

  useEffect(() => {
    if (!loadingExams && !loadingPremiumUsers) {
      setLoading(false);
    }
  }, [loadingExams, loadingPremiumUsers]);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="flex-1 p-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 bg-white p-4 rounded-lg shadow-sm">
        <div>
          <h1 className="text-lg md:text-3xl font-bold text-gray-900">
            Bine ai revenit, {user?.username}
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Explorează examenele recente și gestionează-ți contul cu ușurință!
          </p>
        </div>
        <div className="flex flex-col items-center p-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg shadow-lg hover:shadow-xl transition duration-200">
          <div className="relative flex items-center justify-center mb-2">
            <span className="text-2xl text-white">💎</span>
          </div>
          <div className="text-center text-white">
            <h3 className="text-xs md:text-sm font-semibold uppercase tracking-wider">
              Utilizatori Premium
            </h3>
            <p className="font-bold">{premiumUsers?.count || 0}</p>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-center">Panou de control</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link
          href="/dashboard/profile"
          className="flex flex-col items-center md:items-start justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:bg-gray-50 transition duration-200"
        >
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
            <span className="text-2xl">👤</span>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Profil</h3>
          <p className="text-center md:text-left mt-2 text-sm text-gray-600">
            Vizualizează și actualizează detaliile profilului tău
          </p>
        </Link>
        <Link
          href="/dashboard"
          className="flex flex-col items-center md:items-start justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:bg-gray-50 transition duration-200"
        >
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <span className="text-2xl">⚙️</span>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Setări</h3>
          <p className="text-center md:text-left mt-2 text-sm text-gray-600">
            Actualizează preferințele și detaliile contului tău
          </p>
        </Link>
        <PortalButton token={token} user={user}>
          <div className="flex flex-col items-center md:items-start justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:bg-gray-50 transition duration-200">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
              <span className=" text-2xl">💳</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              {user?.plan === "free" ? "Upgrade" : "Abonament"}
            </h3>
            <p className="text-center md:text-left mt-2 text-sm text-gray-600">
              {user?.plan === "free"
                ? "Actualizează la un plan premium pentru mai multe funcționalități"
                : "Gestionează abonamentul și detaliile de plată"}
            </p>
          </div>
        </PortalButton>
        <Link
          href="/dashboard/exams"
          className="flex flex-col items-center md:items-start justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:bg-gray-50 transition duration-200"
        >
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100">
            <span className="text-2xl">📝</span>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Examene</h3>
          <p className="text-center md:text-left mt-2 text-sm text-gray-600">
            Vizualizează și gestionează examenele tale
          </p>
        </Link>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Ultimele Examene</h2>
        {exams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {exams.map((exam) => (
              <ExamBox key={exam._id} exam={exam} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64 w-full">
            <NoData description={"Nu există examene disponibile."} />
          </div>
        )}
      </div>
    </div>
  );
}
