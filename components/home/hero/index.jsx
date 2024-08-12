import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeroSvg from "./HeroSvg";

export default function Hero() {
  return (
    <section className="relative flex items-center max-w-7xl mx-auto pt-16 px-4 sm:px-6 md:px-8">
      {/* <div className="absolute hidden md:block top-40 -left-20 w-32 h-32">
        <Image src="/cone_3d_shape.png" alt="" fill />
      </div>
      <div className="absolute hidden md:block bottom-0 -left-48 w-32 h-32">
        <Image src="/cube_3d_shape.png" alt="" fill />
      </div> */}
      <div className="relative flex flex-col items-start gap-4 md:basis-1/2 text-center md:text-start">
        {/* <div className="absolute hidden md:block top-20 -right-24 w-32 h-32 -z-10">
          <Image src="/triangle_3d_shape.png" alt="" fill />
        </div> */}
        <h1 className="font-bold text-5xl drop-shadow-md">
          Excelența în
          <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-orange-500 relative inline-block">
            <span className="relative text-white uppercase">Educație </span>
          </span>
          <br />
          Succesul tău garantat
        </h1>
        <p className="text-lg text-neutral-600 border-l-4 border-orange-500 pl-2 drop-shadow-md">
          Optimizează-ți pregătirea cu grile de informatică structurate logic și
          orientate spre rezultate, create de experți pentru a-ți asigura locul
          la facultate.
        </p>
        <Link
          href="/auth/register"
          className="rounded-full text-white mx-auto md:mx-0 bg-green-500 py-4 px-6 shadow-md hover:bg-green-400 duration-300"
        >
          începe gratuit
        </Link>
      </div>
      <div className="relative hidden md:block basis-1/2">
        <HeroSvg />
        {/* <div className="absolute top-0 right-10 w-32 h-32">
          <Image src="/donut_3d_shape.png" alt="" fill />
        </div>
        <div className="absolute w-32 h-32 bottom-0 left-10">
          <Image src="/plus_3d_shape.png" alt="" fill />
        </div> */}
        <div className="absolute top-20 left-24 h-[320px] w-[320px] rounded-full bg-green-500 opacity-30 blur-3xl -z-10"></div>
        <div className="absolute bottom-20 right-24 h-[320px] w-[320px] rounded-full bg-orange-500 opacity-30 blur-3xl -z-10"></div>
      </div>
    </section>
  );
}
