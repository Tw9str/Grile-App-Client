import React from "react";
import { MaterialSymbolsCheck } from "./Icons";
import Button from "./Button";

export default function Plan({
  plan: {
    _id,
    name,
    description,
    price,
    currency,
    interval,
    features,
    popular,
  },
}) {
  return (
    <article
      className={`space-y-4 shadow-lg px-6 py-8 border-2 ${
        popular ? "border-green-500" : "border-neutral-100"
      } rounded-xl cursor-pointer hover:scale-105 duration-300`}
    >
      <div className="flex justify-between items-center w-full">
        <h3
          className={`font-semibold text-lg text-center capitalize ${
            popular ? "text-green-500" : "text-neutral-950"
          }`}
        >
          {name}
        </h3>
        {popular && (
          <p className="rounded-xl p-1 text-sm bg-green-100 text-green-500 w-fit">
            Most popular
          </p>
        )}
      </div>
      <p className="text-sm text-neutral-600 h-10">{description}</p>
      <p>
        <span className="font-bold text-xl uppercase">
          {currency} {price}
        </span>
        <span className="font-semibold text-sm text-neutral-600">
          /{interval}
        </span>
      </p>
      <ul className="text-neutral-600">
        {features.map((feature, index) => (
          <li
            key={index}
            className="grid grid-cols-[auto_1fr] gap-2 mt-4 text-sm items-start"
          >
            <MaterialSymbolsCheck />
            {feature}
          </li>
        ))}
      </ul>
      <Button planId={_id} />
    </article>
  );
}
