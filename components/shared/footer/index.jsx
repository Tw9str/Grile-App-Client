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
            <h2 className="text-lg font-bold sm:text-2xl">COMPANIE</h2>
            <ul className="flex flex-col gap-4 mt-4">
              <li>
                <Link href="#">Despre Noi</Link>
              </li>
              <li>
                <Link href="#">Servicii</Link>
              </li>
              <li>
                <Link href="#">Recenzii</Link>
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
                <Link href="#">Politica de Confidențialitate</Link>
              </li>
              <li>
                <Link href="#">Termeni și Condiții</Link>
              </li>
            </ul>
          </div>
          <Socials className="flex sm:flex-col gap-4" />
        </div>
        <div className="mt-10 pt-10">
          <p className="capitalize">
            &copy; {new Date().getFullYear()} GrileInfo. Toate drepturile
            rezervate.
          </p>
        </div>
      </div>
    </footer>
  );
}
