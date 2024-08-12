export default function Service({ children, reverse }) {
  return (
    <article
      className={`flex flex-col-reverse gap-16 ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } items-center justify-between mt-6`}
    >
      <div className="text-center md:text-start basis-1/2">
        <h3 className="text-2xl font-bold">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        </h3>
        <p className="mt-4 leading-6 text-lg text-neutral-600 max-w-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quidem
          quas accusantium possimus vel. Sequi reiciendis expedita eaque maiores
          eos.
        </p>
      </div>
      <div className="basis-1/3 w-1/3">{children}</div>
    </article>
  );
}
