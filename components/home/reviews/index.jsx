import React from "react";
import Review from "./Review";

export default function Reviews() {
  return (
    <section className="max-w-7xl mx-auto mt-20 pt-4 px-4 sm:px-6 md:px-8">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-lg font-semibold p-2 w-fit mx-auto text-green-500">
          Clientii nostri
        </h2>
        <p className="text-center text-xl text-neutral-600 max-w-2xl mx-auto mt-4">
          Acestea sunt recenziile foștilor clienți. Toți studenți acum.
        </p>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
      </div>
    </section>
  );
}
