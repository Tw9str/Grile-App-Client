import React from "react";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-600 hover:text-red-800 focus:outline-none"
        >
          <span className="sr-only">Close</span>
          &#x2716;
        </button>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
