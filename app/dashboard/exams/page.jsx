"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ExamCategories from "@/components/dashboard/examForms/ExamCategories";
import NoData from "@/components/shared/NoData";
import { fetchCategories } from "@/utils/fetchCategories";

export default function ExamCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const { plan } = useSelector((state) => state.auth.user);

  const PLANS = ["free", "basic", "premium"];
  const userPlanIndex = PLANS.indexOf(plan);

  useEffect(() => {
    const updateCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };

    updateCategories();
  }, []);

  const visibleCategories =
    Array.isArray(categories) &&
    categories.filter(
      (category) =>
        category.isVisible && userPlanIndex >= PLANS.indexOf(category.plan)
    );

  return (
    <section>
      {visibleCategories.length > 0 ? (
        <ExamCategories categories={visibleCategories} />
      ) : (
        <NoData description="No Exams available." />
      )}
    </section>
  );
}
