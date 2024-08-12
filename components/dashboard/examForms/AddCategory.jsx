"use client";
import Notification from "@/components/widgets/Notification";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function AddCategory({ onCategoryAdded }) {
  const [categoryTitle, setCategoryTitle] = useState("");
  const [messages, setMessages] = useState({ message: "", error: "" });
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const token = useSelector((state) => state.auth.token);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setIsNotificationOn(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/categories/add`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: categoryTitle }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessages({ message: data.message, error: "" });
        setCategoryTitle("");
        onCategoryAdded?.();
      } else {
        setMessages({
          message: "",
          error: data.message || "Failed to add category",
        });
      }
    } catch (error) {
      setMessages({ message: "", error: error.message });
    }
  }

  return (
    <div className="w-full lg:w-1/3 bg-white p-8 rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold my-3">Add Category</h1>
        <p className="text-sm text-gray-600">Enter category title</p>
      </div>
      <form className="space-y-8 w-full" onSubmit={handleFormSubmit}>
        <input
          className="w-full px-3 py-2 border rounded-lg focus:outline-green-500"
          type="text"
          name="title"
          placeholder="Title"
          value={categoryTitle}
          onChange={(e) => setCategoryTitle(e.target.value)}
          required
        />
        <button
          className="rounded-full text-white font-semibold bg-green-500 py-4 px-6 shadow-md hover:bg-green-400 duration-300"
          type="submit"
        >
          Add
        </button>
      </form>
      <Notification
        isNotificationOn={isNotificationOn}
        onNotificationClose={setIsNotificationOn}
        messages={messages}
      />
    </div>
  );
}
