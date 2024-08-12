import React from "react";
import Service from "./Service";
import { Books, Certificate, TeachingSvg, Education } from "./Figures";

export default function Services() {
  return (
    <section className="max-w-7xl mx-auto mt-20 pt-4 px-4 sm:px-6 md:px-8">
      <h2 className="text-lg font-semibold p-2 w-fit mx-auto text-green-500">
        What do we offer?
      </h2>
      <div className="mt-10">
        <Service reverse={true}>
          <Books />
        </Service>
        <Service reverse={false}>
          <Certificate />
        </Service>
        <Service reverse={true}>
          <TeachingSvg />
        </Service>
        <Service reverse={false}>
          <Education />
        </Service>
      </div>
    </section>
  );
}
