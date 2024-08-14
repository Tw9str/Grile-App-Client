"use client";
import EditExam from "@/components/EditExam";
import ExamViewer from "@/components/ExamViewer";
import { fetchCategories } from "@/utils/fetchCategories";
import { fetchExam } from "@/utils/fetchExam";
import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/widgets/LoadingSpinner";
import NoData from "@/components/shared/NoData";
import UpgradePrompt from "@/components/widgets/UpgradePrompt";

export default function ExamPage({ params, searchParams }) {
  const token = useSelector((state) => state.auth.token);
  const [categories, setCategories] = useState([]);
  const [examData, setExamData] = useState({ exam: null, error: null });

  useEffect(() => {
    async function fetchData() {
      const fetchedCategories = await fetchCategories(token);
      const fetchedExamData = await fetchExam(params.slug, token);
      setCategories(fetchedCategories);
      setExamData(fetchedExamData);
    }

    if (token) {
      fetchData();
    }
  }, [token, params.slug]);

  const { mode } = searchParams;
  const { exam, error, plan } = examData;

  if (error && plan) {
    return <UpgradePrompt requiredPlan={plan} />;
  }

  if (error) {
    return <NoData description={error} />;
  }

  if (!exam || !categories.length) {
    return <LoadingSpinner />;
  }

  return (
    <section>
      {mode === "edit" ? (
        <EditExam exam={exam} categories={categories} />
      ) : (
        <ExamViewer exam={exam} />
      )}
    </section>
  );
}
