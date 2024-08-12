import Category from "./Category";

export default function ExamCategories({ categories }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center">
      {categories?.map(({ _id, title, examCount, plan, createdAt, user }) => {
        return (
          <li key={_id} className="bg-white rounded-lg shadow-lg p-6">
            <Category
              title={title}
              examCount={examCount}
              plan={plan}
              createdAt={createdAt}
              user={user}
            />
          </li>
        );
      })}
    </ul>
  );
}
