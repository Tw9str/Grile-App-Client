import ExamBox from "@/components/dashboard/ExamBox";
import { fetchCategoryExams } from "@/utils/fetchCategoryExams";
import NoData from "@/components/shared/NoData";

export default async function Category({ params }) {
  const categoryExams = await fetchCategoryExams(params.category);

  const visibleExams =
    Array.isArray(categoryExams) &&
    categoryExams.filter((exam) => exam.isVisible === true);

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 justify-center items-center">
        {visibleExams.length > 0 ? (
          visibleExams.map((exam) => <ExamBox exam={exam} key={exam._id} />)
        ) : (
          <NoData description={"No exams available for this category."} />
        )}
      </div>
    </section>
  );
}
