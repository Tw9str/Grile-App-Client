import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex w-full items-center justify-center min-h-screen bg-gray-100">
      <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-green-600" />
    </div>
  );
};

export default LoadingSpinner;
