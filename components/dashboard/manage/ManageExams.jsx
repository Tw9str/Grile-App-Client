"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { EditIcon, DeleteIcon } from "../Icons";
import OverlayAlert from "@/components/widgets/OverlayAlert";
import NoData from "@/components/shared/NoData";

const ManageExams = ({ exams, onDelete, onUpdate }) => {
  const token = useSelector((state) => state.auth.token);
  const [showOverlay, setShowOverlay] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);

  const confirmDelete = (id) => {
    setShowOverlay(true);
    setExamToDelete(id);
  };

  const handleConfirm = async () => {
    if (examToDelete) {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/exams/delete/${examToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onDelete(examToDelete);
      setShowOverlay(false);
      setExamToDelete(null);
    }
  };

  const handleCancel = () => {
    setShowOverlay(false);
    setExamToDelete(null);
  };

  const handlePlanChange = async (examId, newPlan) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/exams/exam/edit/${examId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan: newPlan }),
      }
    );
    onUpdate(examId, { plan: newPlan });
  };

  const handleVisibilityChange = async (examId, newVisibility) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/exams/exam/edit/${examId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isVisible: newVisibility }),
      }
    );
    onUpdate(examId, { isVisible: newVisibility });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Manage Exams</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">User</th>
            <th className="p-4 text-left">Plan</th>
            <th className="p-4 text-left">Visible</th>
            <th className="p-4 text-left">Created At</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(exams) ? (
            exams.map((exam) => (
              <tr key={exam._id} className="border-b">
                <td className="p-4">{exam?.title}</td>
                <td className="p-4">
                  {exam?.category?.title.replace(/-/g, " ")}
                </td>
                <td className="p-4">{exam?.user?.username}</td>
                <td className="p-4">
                  <select
                    value={exam.plan}
                    onChange={(e) => handlePlanChange(exam._id, e.target.value)}
                    className="border-none appearance-none bg-transparent p-2 cursor-pointer focus:outline-none"
                    style={{ WebkitAppearance: "none", MozAppearance: "none" }}
                  >
                    <option value="free">free</option>
                    <option value="basic">basic</option>
                    <option value="premium">premium</option>
                  </select>
                </td>
                <td className="p-4">
                  <select
                    value={exam.isVisible ? "Yes" : "No"}
                    onChange={(e) =>
                      handleVisibilityChange(exam._id, e.target.value === "Yes")
                    }
                    className="border-none appearance-none bg-transparent p-2 cursor-pointer focus:outline-none"
                    style={{ WebkitAppearance: "none", MozAppearance: "none" }}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
                <td className="p-4">
                  {new Date(exam.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 flex gap-2">
                  <Link
                    href={`exams/category/${exam.slug}?mode=edit`}
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    <EditIcon />
                  </Link>
                  <button
                    className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => confirmDelete(exam._id)}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-4">
                <NoData description="No exams available" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showOverlay && (
        <OverlayAlert
          title="Confirm Deletion"
          description="Are you sure you want to delete this exam?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ManageExams;
