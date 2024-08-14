"use client";
import Link from "next/link";
import { useState } from "react";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  function handleMenuOpen() {
    setIsOpen((prev) => !prev);
  }
  return (
    <nav className="relative order-1 md:order-none">
      <button className="md:hidden" type="button" onClick={handleMenuOpen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2rem"
          height="2rem"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
      <ul
        className={`${
          isOpen ? "flex" : "hidden"
        } md:flex bg-gray-50 md:bg-transparent p-8 md:p-0 shadow-2xl md:shadow-none rounded-xl absolute top-12 right-0 z-50 md:static flex-col md:flex-row justify-center items-center gap-8 md:gap-4 lg:gap-8 font-medium`}
      >
        <li className="border-b-2 border-b-transparent hover:border-b-2 hover:border-green-500 hover:text-green-500 duration-300">
          <Link className="py-4" href="/">
            Home
          </Link>
        </li>
        <li className="border-b-2 border-b-transparent hover:border-b-2 hover:border-green-500 hover:text-green-500 duration-300">
          <Link className="py-4" href="/#plans">
            Planuri
          </Link>
        </li>
        <li className="border-b-2 border-b-transparent hover:border-b-2 hover:border-green-500 hover:text-green-500 duration-300">
          <Link className="py-4" href="/#blog">
            Blog
          </Link>
        </li>
        <li className="border-b-2 border-b-transparent hover:border-b-2 hover:border-green-500 hover:text-green-500 duration-300">
          <Link className="py-4" href="/about">
            Despre Noi
          </Link>
        </li>
        <li className="border-b-2 border-b-transparent hover:border-b-2 hover:border-green-500 hover:text-green-500 duration-300">
          <Link className="py-4" href="/#contact">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
