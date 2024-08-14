import React from "react";
import { useRouter } from "next/navigation";

export default function UpgradePrompt({ requiredPlan }) {
  const router = useRouter();

  const handleUpgradeClick = () => {
    router.push("/dashboard/plans");
  };

  return (
    <div className="text-center space-y-6 w-fit mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
      <span className="text-4xl">👑</span>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        🚀 Upgrade Your Plan to Access This Content
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        This content requires a <strong>{requiredPlan} plan</strong> or higher.
        By upgrading, you'll unlock premium features and exclusive content.
      </p>
      <button
        onClick={handleUpgradeClick}
        className="bg-orange-500 hover:bg-orange-400 text-white py-3 px-6 rounded-lg shadow-lg text-lg font-medium"
      >
        Upgrade Now
      </button>
    </div>
  );
}
