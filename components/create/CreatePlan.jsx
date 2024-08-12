"use client";
import React, { useState } from "react";
import Notification from "@/components/widgets/Notification";
import { selectAuthToken } from "@/utils/token";
import { useSelector } from "react-redux";

export default function CreatePlan() {
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const [messages, setMessages] = useState({ message: "", error: "" });
  const [planData, setPlanData] = useState({
    name: "",
    description: "",
    price: 0,
    currency: "ron", // Default currency set to Romanian Leu
    interval: "month",
    features: [""], // Start with one feature field
    popular: false,
  });
  const [errors, setErrors] = useState({});
  const token = useSelector(selectAuthToken);

  const currencyOptions = [
    { value: "ron", label: "Romanian Leu (RON)" },
    { value: "usd", label: "US Dollar (USD)" },
    { value: "eur", label: "Euro (EUR)" },
    { value: "gbp", label: "British Pound (GBP)" },
    // Add more currencies as needed
  ];

  const validate = () => {
    const newErrors = {};
    if (!planData.name) newErrors.name = "Plan name is required";
    if (!planData.description)
      newErrors.description = "Description is required";
    if (!planData.price || planData.price <= 0)
      newErrors.price = "Price must be a positive number";
    if (planData.features.some((feature) => !feature))
      newErrors.features = "All features must be filled";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...planData.features];
    newFeatures[index] = value;
    setPlanData({ ...planData, features: newFeatures });
  };

  const addFeatureField = () => {
    setPlanData({ ...planData, features: [...planData.features, ""] });
  };

  const removeFeatureField = (index) => {
    const newFeatures = planData.features.filter((_, i) => i !== index);
    setPlanData({ ...planData, features: newFeatures });
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsNotificationOn(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/plans/create`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(planData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessages({
          ...messages,
          message: "Plan created successfully",
          error: "",
        });
        setPlanData({
          name: "",
          description: "",
          price: 0,
          currency: "ron",
          interval: "month",
          features: [""],
          popular: false,
        });
        setErrors({});
      } else {
        setMessages({
          ...messages,
          message: "",
          error: data.error || "Failed to create plan",
        });
      }
    } catch (error) {
      setMessages({ ...messages, message: "", error: error.message });
    }
  };

  return (
    <div className="w-full lg:w-2/3 p-2 md:p-8 bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold my-3">Create Plan</h1>
        <p className="text-sm text-gray-600">Enter plan details</p>
      </div>
      <form className="space-y-8">
        <div className="space-y-4">
          <label htmlFor="name" className="block text-sm text-gray-600">
            Plan Name
          </label>
          <input
            type="text"
            id="name"
            value={planData.name}
            onChange={(e) => setPlanData({ ...planData, name: e.target.value })}
            placeholder="Plan Name"
            className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <label htmlFor="description" className="block text-sm text-gray-600">
            Description
          </label>
          <textarea
            id="description"
            value={planData.description}
            onChange={(e) =>
              setPlanData({ ...planData, description: e.target.value })
            }
            placeholder="Description"
            className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}

          <label htmlFor="price" className="block text-sm text-gray-600">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={planData.price}
            onChange={(e) =>
              setPlanData({ ...planData, price: parseFloat(e.target.value) })
            }
            placeholder="Price"
            className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}

          <label htmlFor="currency" className="block text-sm text-gray-600">
            Currency
          </label>
          <select
            id="currency"
            value={planData.currency}
            onChange={(e) =>
              setPlanData({ ...planData, currency: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
          >
            {currencyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label htmlFor="interval" className="block text-sm text-gray-600">
            Billing Interval
          </label>
          <select
            id="interval"
            value={planData.interval}
            onChange={(e) =>
              setPlanData({ ...planData, interval: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
          >
            <option value="month">Monthly</option>
            <option value="year">Yearly</option>
          </select>

          <label htmlFor="features" className="block text-sm text-gray-600">
            Features
          </label>
          {planData.features.map((feature, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder={`Feature ${index + 1}`}
                className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeFeatureField(index)}
                  className="ml-2 text-white py-2 px-4 font-semibold rounded-xl bg-red-500 hover:bg-red-400 duration-300"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
          {errors.features && (
            <p className="text-red-500 text-sm">{errors.features}</p>
          )}
          <button
            type="button"
            onClick={addFeatureField}
            className="mt-2 text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md shadow-md"
          >
            Add Feature
          </button>
          <button
            type="button"
            onClick={() =>
              setPlanData({ ...planData, popular: !planData.popular })
            }
            className={`block py-2 px-4 rounded-full ${
              planData.popular
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Popular
          </button>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-full text-white font-semibold bg-green-500 py-4 px-6 shadow-md hover:bg-green-400 duration-300"
          >
            Create Plan
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
