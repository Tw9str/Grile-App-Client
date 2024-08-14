"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ExamCategories from "@/components/dashboard/examForms/ExamCategories";
import NoData from "@/components/shared/NoData";
import LoadingSpinner from "@/components/widgets/LoadingSpinner";
import { fetchCategories } from "@/utils/fetchCategories";

export default function ExamCategoriesPage() {
  const [categoriesData, setCategoriesData] = useState({
    categories: [],
    error: null,
  });
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const updateCategories = async () => {
      try {
        setLoading(true);
        const fetchedCategories = await fetchCategories(token);
        setCategoriesData({ categories: fetchedCategories, error: null });
      } catch (error) {
        setCategoriesData({ categories: [], error: error.message });
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      updateCategories();
    }
  }, [token]);

  const { categories, error } = categoriesData;

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <NoData description={error} />;
  }

  const visibleCategories = categories.filter(
    (category) => category.isVisible === true
  );

  if (!visibleCategories.length) {
    return <NoData description="No exams available." />;
  }

  return (
    <section>
      <ExamCategories categories={visibleCategories} />
    </section>
  );
}
