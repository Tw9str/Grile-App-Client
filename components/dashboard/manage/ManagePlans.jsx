"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { EditIcon, DeleteIcon } from "../Icons";
import OverlayAlert from "@/components/widgets/OverlayAlert";
import NoData from "@/components/shared/NoData";

const ManagePlans = ({ plans, onDelete }) => {
  const token = useSelector((state) => state.auth.token);
  const [showOverlay, setShowOverlay] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);

  const confirmDelete = (id) => {
    setShowOverlay(true);
    setPlanToDelete(id);
  };

  const handleConfirm = async () => {
    if (planToDelete) {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/plans/delete/${planToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onDelete(planToDelete);
      setShowOverlay(false);
      setPlanToDelete(null);
    }
  };

  const handleCancel = () => {
    setShowOverlay(false);
    setPlanToDelete(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Manage Plans</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Currency</th>
            <th className="p-4 text-left">Interval</th>
            <th className="p-4 text-left">Created At</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(plans) && plans.length > 0 ? (
            plans.map((plan) => (
              <tr key={plan._id} className="border-b">
                <td className="p-4">{plan.name}</td>
                <td className="p-4">{plan.price}</td>
                <td className="p-4">{plan.currency}</td>
                <td className="p-4">{plan.interval}</td>
                <td className="p-4">
                  {new Date(plan.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 flex gap-2">
                  <button
                    className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => confirmDelete(plan._id)}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-4">
                <NoData description="No plans available" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showOverlay && (
        <OverlayAlert
          title="Confirm Deletion"
          description="Are you sure you want to delete this plan?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ManagePlans;
