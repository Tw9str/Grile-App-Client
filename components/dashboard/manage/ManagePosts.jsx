"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { EditIcon, DeleteIcon } from "../Icons";
import OverlayAlert from "@/components/widgets/OverlayAlert";
import NoData from "@/components/shared/NoData";

const ManagePosts = ({ posts, onDelete }) => {
  const token = useSelector((state) => state.auth.token);
  const [showOverlay, setShowOverlay] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const confirmDelete = (id) => {
    setShowOverlay(true);
    setPostToDelete(id);
  };

  const handleConfirm = async () => {
    if (postToDelete) {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/manage/post/delete/${postToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onDelete(postToDelete);
      setShowOverlay(false);
      setPostToDelete(null);
    }
  };

  const handleCancel = () => {
    setShowOverlay(false);
    setPostToDelete(null);
  };

  const handleVisibilityChange = async (postId, newVisibility) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/manage/post/edit/${postId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isPublished: newVisibility }),
      }
    );
    onUpdate(postId, { isPublished: newVisibility });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Manage Posts</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Author</th>
            <th className="p-4 text-left">Tag</th>
            <th className="p-4 text-left">Published</th>
            <th className="p-4 text-left">Created At</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post) => (
              <tr key={post._id} className="border-b">
                <td className="p-4">{post.title}</td>
                <td className="p-4">{post.author?.username || "Unknown"}</td>
                <td className="p-4">{post.tag}</td>
                <td className="p-4">
                  <select
                    value={post.isPublished ? "Yes" : "No"}
                    onChange={(e) =>
                      handleVisibilityChange(post._id, e.target.value === "Yes")
                    }
                    className="border-none appearance-none bg-transparent p-2 cursor-pointer focus:outline-none"
                    style={{ WebkitAppearance: "none", MozAppearance: "none" }}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
                <td className="p-4">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 flex gap-2">
                  <button
                    className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => confirmDelete(post._id)}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">
                <NoData description="No posts available" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showOverlay && (
        <OverlayAlert
          title="Confirm Deletion"
          description="Are you sure you want to delete this post?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ManagePosts;
