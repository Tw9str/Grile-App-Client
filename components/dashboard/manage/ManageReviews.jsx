"use client";
import React, { useState } from "react";
import OverlayAlert from "@/components/widgets/OverlayAlert";
import Notification from "@/components/widgets/Notification";
import NoData from "@/components/shared/NoData";
import Modal from "@/components/widgets/Modal";

const ManageReviews = ({ reviews, onDelete }) => {
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [reviewToApprove, setReviewToApprove] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    error: "",
    isVisible: false,
  });

  const [localReviews, setLocalReviews] = useState(reviews);

  const confirmDelete = (id) => {
    setShowOverlay(true);
    setReviewToDelete(id);
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/reviews/${reviewToDelete}`,
        {
          method: "DELETE",
        }
      );
      onDelete(reviewToDelete);
      setNotification({
        message: "Review deleted successfully",
        error: "",
        isVisible: true,
      });
      setLocalReviews(
        localReviews.filter((review) => review._id !== reviewToDelete)
      );
    } catch (err) {
      setNotification({ message: "", error: err.message, isVisible: true });
    } finally {
      setShowOverlay(false);
      setReviewToDelete(null);
    }
  };

  const handleApprove = async (reviewId) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/reviews/approve/${reviewId}`,
        {
          method: "PATCH",
        }
      );
      setNotification({
        message: "Review approved successfully",
        error: "",
        isVisible: true,
      });

      // Update the local state to reflect the approval
      setLocalReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === reviewId ? { ...review, isApproved: true } : review
        )
      );
    } catch (err) {
      setNotification({ message: "", error: err.message, isVisible: true });
    } finally {
      setReviewToApprove(null);
    }
  };

  const handleCancel = () => {
    setShowOverlay(false);
    setReviewToDelete(null);
    setReviewToApprove(null);
  };

  const openModal = (review) => {
    setSelectedReview(review);
  };

  const closeModal = () => {
    setSelectedReview(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Manage Reviews</h2>
      {localReviews.length === 0 ? (
        <NoData description="No reviews available" />
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Review</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {localReviews.map((review) => (
              <tr key={review._id} className="hover:bg-gray-50">
                <td className="p-4 text-gray-800">{review.user.username}</td>
                <td className="p-4 text-gray-800">
                  <p
                    className="truncate max-w-md cursor-pointer text-blue-500 hover:underline"
                    onClick={() => openModal(review)}
                  >
                    {review.message}
                  </p>
                </td>
                <td className="p-4 text-gray-600">
                  {new Date(review.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 flex gap-2">
                  {!review.isApproved ? (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                      onClick={() => handleApprove(review._id)}
                      disabled={review.isApproved}
                    >
                      {review.isApproved ? "Approved" : "Approve"}
                    </button>
                  ) : (
                    <button
                      className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
                      disabled
                    >
                      Approved
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => confirmDelete(review._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showOverlay && (
        <OverlayAlert
          title="Confirm Deletion"
          description="Are you sure you want to delete this review?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancel}
        />
      )}

      {notification.isVisible && (
        <Notification
          isNotificationOn={notification.isVisible}
          onNotificationClose={() =>
            setNotification({ ...notification, isVisible: false })
          }
          messages={{
            message: notification.message,
            error: notification.error,
          }}
        />
      )}

      {selectedReview && (
        <Modal onClose={closeModal}>
          <h3 className="text-lg font-semibold mb-2">Review Details</h3>
          <p className="text-gray-800">{selectedReview.message}</p>
        </Modal>
      )}
    </div>
  );
};

export default ManageReviews;
