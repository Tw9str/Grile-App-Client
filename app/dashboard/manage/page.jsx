"use client";
import React, { useState, useEffect } from "react";
import ManageCategories from "@/components/dashboard/manage/ManageCategories";
import ManageExams from "@/components/dashboard/manage/ManageExams";
import ManageUsers from "@/components/dashboard/manage/ManageUsers";
import ManagePlans from "@/components/dashboard/manage/ManagePlans";
import ManagePosts from "@/components/dashboard/manage/ManagePosts";
import LoadingSpinner from "@/components/widgets/LoadingSpinner";
import Accordion from "@/components/widgets/Accordion";

export default function Manage() {
  const [categories, setCategories] = useState([]);
  const [exams, setExams] = useState([]);
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          categoriesResponse,
          examsResponse,
          usersResponse,
          plansResponse,
          postsResponse,
        ] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/categories`).then(
            (res) => res.json()
          ),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/exams`).then((res) =>
            res.json()
          ),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/users`).then((res) =>
            res.json()
          ),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/plans`).then((res) =>
            res.json()
          ),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/posts`).then((res) =>
            res.json()
          ), // Fetching posts data
        ]);

        setCategories(categoriesResponse);
        setExams(examsResponse);
        setUsers(usersResponse);
        setPlans(plansResponse);
        setPosts(postsResponse); // Setting posts data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryDelete = (id) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category._id !== id)
    );
  };

  const handleCategoryUpdate = (id, updatedFields) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category._id === id ? { ...category, ...updatedFields } : category
      )
    );
  };

  const handleExamDelete = (id) => {
    setExams((prevExams) => prevExams.filter((exam) => exam._id !== id));
  };

  const handleExamUpdate = (id, updatedFields) => {
    setExams((prevExams) =>
      prevExams.map((exam) =>
        exam._id === id ? { ...exam, ...updatedFields } : exam
      )
    );
  };

  const handleUserDelete = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
  };

  const handleUserPromote = (id, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id ? { ...user, role: newRole } : user
      )
    );
  };

  const handleUserUpdate = (id, updatedFields) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id ? { ...user, ...updatedFields } : user
      )
    );
  };

  const handlePlanDelete = (id) => {
    setPlans((prevPlans) => prevPlans.filter((plan) => plan._id !== id));
  };

  const handlePostDelete = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
  };

  const handlePostUpdate = (id, updatedFields) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === id ? { ...post, ...updatedFields } : post
      )
    );
  };

  if (loading) return <LoadingSpinner />;

  return (
    <section className="grid gap-4">
      <Accordion title="Manage Categories">
        <ManageCategories
          categories={categories}
          onDelete={handleCategoryDelete}
          onUpdate={handleCategoryUpdate}
        />
      </Accordion>
      <Accordion title="Manage Exams">
        <ManageExams
          exams={exams}
          onDelete={handleExamDelete}
          onUpdate={handleExamUpdate}
        />
      </Accordion>
      <Accordion title="Manage Users">
        <ManageUsers
          users={users}
          onDelete={handleUserDelete}
          onPromote={handleUserPromote}
          onUpdate={handleUserUpdate}
        />
      </Accordion>
      <Accordion title="Manage Plans">
        <ManagePlans plans={plans} onDelete={handlePlanDelete} />
      </Accordion>
      <Accordion title="Manage Reviews">Reviews</Accordion>
      <Accordion title="Manage Posts">
        <ManagePosts
          posts={posts}
          onDelete={handlePostDelete}
          onUpdate={handlePostUpdate}
        />
      </Accordion>
    </section>
  );
}
