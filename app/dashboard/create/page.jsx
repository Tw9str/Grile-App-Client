"use client";
import { useState, useEffect } from "react";
import { fetchCategories } from "@/utils/fetchCategories";
import CreateExam from "@/components/dashboard/examForms/CreateExam";
import AddCategory from "@/components/dashboard/examForms/AddCategory";
import CreatePlan from "@/components/create/CreatePlan";
import Accordion from "@/components/widgets/Accordion";
import CreatePost from "@/components/create/CreatePost";
import { useSelector } from "react-redux";

export default function CreateExamPage() {
  const [categories, setCategories] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const loadCategories = async () => {
    const fetchedCategories = await fetchCategories(token);
    setCategories(fetchedCategories);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <section className="grid items-center gap-4">
      <Accordion title="Create Exam">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
          <CreateExam categories={categories} />
          <AddCategory onCategoryAdded={loadCategories} />
        </div>
      </Accordion>
      <Accordion title="Create Plan">
        <CreatePlan />
      </Accordion>
      <Accordion title="Create Post">
        <CreatePost />
      </Accordion>
    </section>
  );
}
