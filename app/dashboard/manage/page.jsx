"use client";
import React, { useState, useEffect } from "react";
import ManageCategories from "@/components/dashboard/manage/ManageCategories";
import ManageExams from "@/components/dashboard/manage/ManageExams";
import ManageUsers from "@/components/dashboard/manage/ManageUsers";
import ManagePlans from "@/components/dashboard/manage/ManagePlans";
import ManageReviews from "@/components/dashboard/manage/ManageReviews";
import ManagePosts from "@/components/dashboard/manage/ManagePosts";
import LoadingSpinner from "@/components/widgets/LoadingSpinner";
import NoData from "@/components/shared/NoData";
import Accordion from "@/components/widgets/Accordion";
import { useSelector } from "react-redux";

export default function Manage() {
  const [categories, setCategories] = useState([]);
  const [exams, setExams] = useState([]);
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [posts, setPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({
    categories: null,
    exams: null,
    users: null,
    plans: null,
    posts: null,
    reviews: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/categories`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        setErrors((prev) => ({ ...prev, categories: error.message }));
      }
    };

    const fetchExams = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/exams`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch exams");
        const data = await res.json();
        setExams(data);
      } catch (error) {
        setErrors((prev) => ({ ...prev, exams: error.message }));
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        setErrors((prev) => ({ ...prev, users: error.message }));
      }
    };

    const fetchPlans = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/plans`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch plans");
        const data = await res.json();
        setPlans(data);
      } catch (error) {
        setErrors((prev) => ({ ...prev, plans: error.message }));
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/posts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        setErrors((prev) => ({ ...prev, posts: error.message }));
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/reviews`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        setErrors((prev) => ({ ...prev, reviews: error.message }));
      }
    };

    Promise.all([
      fetchCategories(),
      fetchExams(),
      fetchUsers(),
      fetchPlans(),
      fetchPosts(),
      fetchReviews(),
    ]).finally(() => setLoading(false));
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

  const handleReviewDelete = (id) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review._id !== id)
    );
  };

  if (loading) return <LoadingSpinner />;

  return (
    <section className="grid gap-4">
      <Accordion title="Manage Categories">
        {errors.categories ? (
          <NoData description={errors.categories} />
        ) : (
          <ManageCategories
            categories={categories}
            onDelete={handleCategoryDelete}
            onUpdate={handleCategoryUpdate}
          />
        )}
      </Accordion>
      <Accordion title="Manage Exams">
        {errors.exams ? (
          <NoData description={errors.exams} />
        ) : (
          <ManageExams
            exams={exams}
            onDelete={handleExamDelete}
            onUpdate={handleExamUpdate}
          />
        )}
      </Accordion>
      <Accordion title="Manage Users">
        {errors.users ? (
          <NoData description={errors.users} />
        ) : (
          <ManageUsers
            users={users}
            onDelete={handleUserDelete}
            onPromote={handleUserPromote}
            onUpdate={handleUserUpdate}
          />
        )}
      </Accordion>
      <Accordion title="Manage Plans">
        {errors.plans ? (
          <NoData description={errors.plans} />
        ) : (
          <ManagePlans plans={plans} onDelete={handlePlanDelete} />
        )}
      </Accordion>
      <Accordion title="Manage Reviews">
        {errors.reviews ? (
          <NoData description={errors.reviews} />
        ) : (
          <ManageReviews reviews={reviews} onDelete={handleReviewDelete} />
        )}
      </Accordion>
      <Accordion title="Manage Posts">
        {errors.posts ? (
          <NoData description={errors.posts} />
        ) : (
          <ManagePosts
            posts={posts}
            onDelete={handlePostDelete}
            onUpdate={handlePostUpdate}
          />
        )}
      </Accordion>
    </section>
  );
}
