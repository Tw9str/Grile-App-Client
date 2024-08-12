import React, { useState, useEffect } from "react";

export default function Notification({
  isNotificationOn,
  onNotificationClose,
  messages,
}) {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (isNotificationOn) {
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
        onNotificationClose(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isNotificationOn, onNotificationClose]);

  return (
    showNotification && (
      <div className="fixed right-10 bottom-10 shadow-md rounded-xl bg-white p-4 overflow-hidden">
        <div className="flex items-start gap-4">
          <div>
            {messages.error ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#ef4444"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="w-6 h-6 text-green-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>
          <div>
            <p>{messages.error ? "An error occured" : "Successfully saved!"}</p>
            <p className="text-gray-600">
              {messages.error ? messages.error : messages.message}
            </p>
          </div>
          <button
            onClick={() => {
              setShowNotification(false);
              onNotificationClose(false);
            }}
            className="text-gray-500 hover:text-gray-950"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="w-5 h-5"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500">
            <div className="h-full bg-green-600 animate-progress"></div>
          </div>
        </div>
      </div>
    )
  );
}
