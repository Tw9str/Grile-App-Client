"use client";
import { useState } from "react";

export default function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <div
        className="flex justify-between items-center pt-2 md:pt-8 pb-4 p-2 md:px-4 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h2 className="font-semibold text-xl">{title}</h2>
        <svg
          className={`w-8 h-8 transition-transform transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          width="2rem"
          height="2rem"
          viewBox="0 0 24 24"
        >
          <path
            fill="black"
            d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6z"
          ></path>
        </svg>
      </div>
      <div
        className={`leading-6 text-lg text-neutral-600 pb-8 px-2 md:px-4 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
