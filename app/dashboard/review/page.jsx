"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Notification from "@/components/widgets/Notification";

export default function CreateReview() {
  const [reviewText, setReviewText] = useState("");
  const [errors, setErrors] = useState({});
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const [messages, setMessages] = useState({ message: "", error: "" });

  const token = useSelector((state) => state.auth.token);

  const validate = () => {
    const newErrors = {};
    if (!reviewText) newErrors.text = "Review text is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsNotificationOn(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/reviews/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: reviewText }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessages({ message: "Review posted successfully", error: "" });
        setReviewText("");
        setErrors({});
      } else {
        setMessages({
          message: "",
          error: data.error || "Failed to post review",
        });
      }
    } catch (error) {
      setMessages({ message: "", error: error.message });
    }
  };

  return (
    <div className="mx-auto lg:w-1/2 p-2 md:p-8 bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold my-3">Post a Review</h1>
        <p className="text-sm text-gray-600">Share your thoughts with us</p>
      </div>
      <form className="space-y-8">
        <div className="space-y-4">
          <label htmlFor="text" className="block text-sm text-gray-600">
            Message:
          </label>
          <textarea
            id="text"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here"
            className="w-full h-36 px-3 py-2 border rounded-md focus:outline-green-500"
            maxLength={250}
          ></textarea>
          {errors.text && <p className="text-red-500 text-sm">{errors.text}</p>}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-full text-white font-semibold bg-green-500 py-4 px-6 shadow-md hover:bg-green-400 duration-300"
          >
            Post Review
          </button>
        </div>
      </form>
      <Notification
        isNotificationOn={isNotificationOn}
        onNotificationClose={setIsNotificationOn}
        messages={messages}
      />
    </div>
  );
}
