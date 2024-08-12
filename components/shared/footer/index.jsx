import React from "react";
import Logo from "../header/Logo";
import Socials from "@/components/widgets/Socials";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-900 mt-20">
      <div className="text-white max-w-7xl mx-auto pt-16 px-4 sm:px-6 md:px-8 pb-16 divide-y divide-neutral-200">
        <div className="flex flex-col gap-12 sm:flex-row justify-between items-start">
          <div>
            <Logo color="#FFFFFF" />
            <p className="mt-4 max-w-sm">
              Optimizează-ți pregătirea cu grile de informatică structurate
              logic și orientate spre rezultate, create de experți pentru a-ți
              asigura locul la facultate.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold sm:text-2xl">COMPANY</h2>
            <ul className="flex flex-col gap-4 mt-4">
              <li>
                <Link href="#">About</Link>
              </li>
              <li>
                <Link href="#">Services</Link>
              </li>
              <li>
                <Link href="#">Reviews</Link>
              </li>
              <li>
                <Link href="#">Blog</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold sm:text-2xl">LEGAL</h2>
            <ul className="flex flex-col gap-4 mt-4">
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
          <Socials className="flex sm:flex-col gap-4" />
        </div>
        <div className="mt-10 pt-10">
          <p className="capitalize">
            &copy; {new Date().getFullYear()} GrileInfo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
