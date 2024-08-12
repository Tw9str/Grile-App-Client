"use client";
import React, { useState } from "react";
import Notification from "@/components/widgets/Notification";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function CreatePost() {
  const [notification, setNotification] = useState({
    message: "",
    error: "",
    isVisible: false,
  });
  const [postData, setPostData] = useState({
    image: null, // Image file object
    tag: "",
    title: "",
    description: "",
  });
  const [imagePreview, setImagePreview] = useState(null); // Image preview URL
  const [errors, setErrors] = useState({});
  const token = useSelector((state) => state.auth.token);

  const validate = () => {
    const newErrors = {
      image: postData.image ? "" : "Image is required",
      tag: postData.tag ? "" : "Tag is required",
      title: postData.title ? "" : "Post title is required",
      description: postData.description ? "" : "Description is required",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setPostData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPostData((prevData) => ({ ...prevData, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const formData = new FormData();
    formData.append("tag", postData.tag);
    formData.append("title", postData.title);
    formData.append("description", postData.description);
    if (postData.image) {
      formData.append("image", postData.image);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/posts/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setNotification({
          message: "Post created successfully",
          error: "",
          isVisible: true,
        });
        setPostData({ image: null, tag: "", title: "", description: "" });
        setImagePreview(null);
        setErrors({});
      } else {
        setNotification({
          message: "",
          error: data.error || "Failed to create post",
          isVisible: true,
        });
      }
    } catch (error) {
      setNotification({
        message: "",
        error: error.message || "An error occurred",
        isVisible: true,
      });
    }
  };

  return (
    <div className="w-full lg:w-2/3 p-2 md:p-8 bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold my-3">Create Post</h1>
        <p className="text-sm text-gray-600">Enter post details</p>
      </div>
      <form className="space-y-8">
        <div className="space-y-4">
          <label htmlFor="image" className="block text-sm text-gray-600">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageUpload}
            className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image}</p>
          )}
          {imagePreview && (
            <div className="mt-2">
              <Image
                src={imagePreview}
                alt="Image Preview"
                width={640}
                height={640}
                className="rounded-lg"
              />
            </div>
          )}

          <label htmlFor="tag" className="block text-sm text-gray-600">
            Tag
          </label>
          <input
            type="text"
            id="tag"
            value={postData.tag}
            onChange={handleInputChange}
            placeholder="Tag"
            className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
          />
          {errors.tag && <p className="text-red-500 text-sm">{errors.tag}</p>}

          <label htmlFor="title" className="block text-sm text-gray-600">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={postData.title}
            onChange={handleInputChange}
            placeholder="Post Title"
            className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}

          <label htmlFor="description" className="block text-sm text-gray-600">
            Description
          </label>
          <textarea
            id="description"
            value={postData.description}
            onChange={handleInputChange}
            placeholder="Post Description"
            className="w-full h-60 px-3 py-2 border rounded-md focus:outline-green-500"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-full text-white font-semibold bg-green-500 py-4 px-6 shadow-md hover:bg-green-400 duration-300"
          >
            Create Post
          </button>
        </div>
      </form>
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
    </div>
  );
}
