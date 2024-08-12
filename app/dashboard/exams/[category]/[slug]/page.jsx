import EditExam from "@/components/EditExam";
import ExamViewer from "@/components/ExamViewer";
import { fetchCategories } from "@/utils/fetchCategories";
import { fetchExam } from "@/utils/fetchExam";
import React from "react";

export default async function ExamPage({ params, searchParams }) {
  const categories = await fetchCategories();
  const exam = await fetchExam(params.slug);
  const { mode } = searchParams;

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
