import Link from "next/link";
import React from "react";

export default function Sign() {
  return (
    <Link
      href="/login"
      className="rounded-full text-white text-xs md:text-base bg-green-500 mr-2 ml-auto md:mr-0 md:ml-0 p-4 md:py-4 md:px-6 shadow-md hover:bg-green-400 duration-300"
    >
      Autentificare
    </Link>
  );
}
