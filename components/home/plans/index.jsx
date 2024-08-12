"use client";
import React, { useEffect, useState } from "react";
import Plan from "./Plan";

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: null });

  useEffect(() => {
    async function loadPlans() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/plans`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch plans");
        }
        const fetchedPlans = await res.json();
        setPlans(fetchedPlans);
        setStatus({ loading: false, error: null });
      } catch (err) {
        setStatus({ loading: false, error: err.message });
      }
    }

    loadPlans();
  }, []);

  if (status.loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  if (status.error) {
    return (
      <div className="flex justify-center items-center h-48 text-red-600">
        Error loading plans: {status.error}
      </div>
    );
  }

  return (
    <section
      id="plans"
      className="max-w-7xl mx-auto mt-20 pt-4 px-4 sm:px-6 md:px-8"
    >
      <div className="mx-auto text-center">
        <h2 className="text-lg font-semibold p-2 w-fit mx-auto text-green-500">
          Preturi
        </h2>
        <p className="font-bold text-5xl mt-2">
          Planuri de prețuri pentru toată lumea
        </p>
      </div>
      <p className="text-center text-xl text-neutral-600 max-w-2xl mx-auto mt-4">
        Partenerul tău pentru succes academic Noi transformăm învățarea usuara
        în realitate.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {plans.map((plan) => (
          <Plan key={plan._id} plan={plan} />
        ))}
      </div>
    </section>
  );
}
