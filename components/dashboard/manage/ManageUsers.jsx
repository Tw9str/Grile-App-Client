"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PromoteIcon, DeleteIcon } from "../Icons";
import OverlayAlert from "@/components/widgets/OverlayAlert";
import ConfirmModal from "@/components/widgets/ConfirmModal";
import { updateUserDetails } from "@/state/authSlice";

const ManageUsers = ({ users, onDelete, onPromote, onUpdate }) => {
  const token = useSelector((state) => state.auth.token);
  const [showOverlay, setShowOverlay] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToPromote, setUserToPromote] = useState(null);
  const [role, setRole] = useState("student");
  const dispatch = useDispatch();

  const confirmDelete = (id) => {
    setShowOverlay(true);
    setUserToDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/manage/user/delete/${userToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onDelete(userToDelete);
      setShowOverlay(false);
      setUserToDelete(null);
    }
  };

  const handleCancel = () => {
    setShowOverlay(false);
    setUserToDelete(null);
    setUserToPromote(null);
  };

  const promoteUser = async () => {
    if (userToPromote) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/manage/user/promote/${userToPromote}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ role }),
          }
        );

        if (response.ok) {
          const user = await response.json();
          onPromote(userToPromote, role);
          dispatch(updateUserDetails(user));
        } else {
          console.error("Failed to promote user:", response.statusText);
        }
      } catch (error) {
        console.error("Error promoting user:", error);
      } finally {
        setUserToPromote(null);
      }
    }
  };

  const updatePlan = async (userId, newPlan) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/manage/user/update/${userId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ plan: newPlan }),
        }
      );

      if (response.ok) {
        const user = await response.json();
        onUpdate(userId, { plan: newPlan });
        dispatch(updateUserDetails(user));
      } else {
        console.error("Failed to update user plan:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user plan:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-4 text-left">Username</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Plan</th>
            <th className="p-4 text-left">Created At</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="p-4">{user.username}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.role}</td>
              <td className="p-4">
                <select
                  value={user.plan}
                  onChange={(e) => updatePlan(user._id, e.target.value)}
                  className="border-none appearance-none bg-transparent p-2 cursor-pointer focus:outline-none"
                  style={{ WebkitAppearance: "none", MozAppearance: "none" }}
                >
                  <option value="free">free</option>
                  <option value="basic">basic</option>
                  <option value="premium">premium</option>
                </select>
              </td>
              <td className="p-4">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="p-4 flex gap-2">
                <button
                  className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => setUserToPromote(user._id)}
                >
                  <PromoteIcon />
                </button>
                <button
                  className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => confirmDelete(user._id)}
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showOverlay && (
        <OverlayAlert
          title="Confirm Deletion"
          description="Are you sure you want to delete this user?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancel}
        />
      )}
      {userToPromote && (
        <ConfirmModal
          onConfirm={promoteUser}
          onCancel={handleCancel}
          role={role}
          setRole={setRole}
        />
      )}
    </div>
  );
};

export default ManageUsers;
