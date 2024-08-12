import Question from "./Question";
import { itemList } from "./itemList";

export default function Questions() {
  return (
    <section className="max-w-7xl mx-auto mt-20 pt-4 px-4 sm:px-6 md:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 sm:text-4xl">
        Most frequently asked questions
      </h2>
      <div className="mt-10">
        {itemList.map((item, index) => (
          <Question key={index} item={item} />
        ))}
      </div>
    </section>
  );
}
