"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DeleteIcon, EditIcon } from "../Icons";
import OverlayAlert from "@/components/widgets/OverlayAlert";
import NoData from "@/components/shared/NoData";

const ManageCategories = ({ categories, onDelete, onUpdate }) => {
  const token = useSelector((state) => state.auth.token);
  const [showOverlay, setShowOverlay] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const confirmDelete = (id) => {
    setShowOverlay(true);
    setCategoryToDelete(id);
  };

  const handleConfirm = async () => {
    if (categoryToDelete) {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/manage/category/delete/${categoryToDelete}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onDelete(categoryToDelete);
      setShowOverlay(false);
      setCategoryToDelete(null);
    }
  };

  const handleUpdate = async (categoryId, data) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/manage/category/update/${categoryId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    onUpdate(categoryId, data);
    setEditingCategoryId(null);
  };

  const handleEditClick = (category) => {
    setEditingCategoryId(category._id);
    setNewTitle(category.title);
  };

  const handleTitleChange = (e) => setNewTitle(e.target.value);
  const handleTitleBlur = (categoryId) =>
    handleUpdate(categoryId, { title: newTitle });
  const handleTitleKeyPress = (e, categoryId) =>
    e.key === "Enter" && handleUpdate(categoryId, { title: newTitle });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Manage Categories</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Plan</th>
            <th className="p-4 text-left">Visible</th>
            <th className="p-4 text-left">Created At</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category._id} className="border-b">
                <td className="p-4">
                  {editingCategoryId === category._id ? (
                    <input
                      type="text"
                      value={newTitle}
                      onChange={handleTitleChange}
                      onBlur={() => handleTitleBlur(category._id)}
                      onKeyDown={(e) => handleTitleKeyPress(e, category._id)}
                      className="border p-2 rounded"
                      autoFocus
                    />
                  ) : (
                    <span
                      onClick={() => handleEditClick(category)}
                      className="cursor-pointer"
                    >
                      {category.title.replace(/-/g, " ")}
                    </span>
                  )}
                </td>
                <td className="p-4">
                  <select
                    value={category.plan}
                    onChange={(e) =>
                      handleUpdate(category._id, { plan: e.target.value })
                    }
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
                    value={category.isVisible ? "Yes" : "No"}
                    onChange={(e) =>
                      handleUpdate(category._id, {
                        isVisible: e.target.value === "Yes",
                      })
                    }
                    className="border-none appearance-none bg-transparent p-2 cursor-pointer focus:outline-none"
                    style={{ WebkitAppearance: "none", MozAppearance: "none" }}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
                <td className="p-4">
                  {new Date(category.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 flex gap-2">
                  <button
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => handleEditClick(category)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => confirmDelete(category._id)}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">
                <NoData description="No categories available" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showOverlay && (
        <OverlayAlert
          title="Confirm Deletion"
          description="Are you sure you want to delete this category?"
          onConfirm={handleConfirm}
          onCancel={() => setShowOverlay(false)}
        />
      )}
    </div>
  );
};

export default ManageCategories;
