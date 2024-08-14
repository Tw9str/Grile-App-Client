"use client";
import { useState, useEffect } from "react";
import ExamBox from "@/components/dashboard/ExamBox";
import { fetchCategoryExams } from "@/utils/fetchCategoryExams";
import NoData from "@/components/shared/NoData";
import LoadingSpinner from "@/components/widgets/LoadingSpinner";
import UpgradePrompt from "@/components/widgets/UpgradePrompt";
import { useSelector } from "react-redux";

export default function Category({ params }) {
  const token = useSelector((state) => state.auth.token);
  const [categoryExamsData, setCategoryExamsData] = useState({
    exams: [],
    error: null,
    plan: null,
  });

  useEffect(() => {
    async function fetchData() {
      const fetchedCategoryExamsData = await fetchCategoryExams(
        params.category,
        token
      );
      setCategoryExamsData(fetchedCategoryExamsData);
    }

    if (token) {
      fetchData();
    }
  }, [token, params.category]);

  const { exams, error, plan } = categoryExamsData;

  if (error && plan) {
    return <UpgradePrompt requiredPlan={plan} />;
  }

  if (error) {
    return <NoData description={error} />;
  }

  if (!exams.length) {
    return <LoadingSpinner />;
  }

  const visibleExams = exams.filter((exam) => exam.isVisible === true);

  if (!visibleExams.length) {
    return <NoData description="No exams available for this category." />;
  }

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 justify-center items-center">
        {visibleExams.map((exam) => (
          <ExamBox exam={exam} key={exam._id} />
        ))}
      </div>
    </section>
  );
}
