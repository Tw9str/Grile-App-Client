export default function Service({ children, reverse, title, description }) {
  return (
    <article
      className={`flex flex-col-reverse gap-16 ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } items-center justify-between mt-6`}
    >
      <div className="text-center md:text-start basis-1/2">
        <h3 className="text-3xl font-bold text-gray-900">{title}</h3>
        <p className="mt-4 leading-7 text-lg text-neutral-600 max-w-2xl">
          {description}
        </p>
      </div>
      <div className="basis-1/3 w-1/3">{children}</div>
    </article>
  );
}
