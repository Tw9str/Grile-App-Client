"use client";

import React, { useState, useEffect } from "react";
import Post from "./Post";
import LoadingSpinner from "@/components/widgets/LoadingSpinner";
import NoData from "@/components/shared/NoData";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: null });

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/posts`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const fetchedPosts = await res.json();
        setPosts(fetchedPosts.filter((post) => post.isPublished));
        setStatus({ loading: false, error: null });
      } catch (err) {
        setStatus({ loading: false, error: err.message });
      }
    }

    loadPosts();
  }, []);

  if (status.loading) {
    return <LoadingSpinner />;
  }

  if (status.error) {
    return <NoData description={status.error} />;
  }

  return (
    <section
      id="blog"
      className="max-w-7xl mx-auto mt-20 pt-4 px-4 sm:px-6 md:px-8"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold text-center tracking-tight text-gray-900 sm:text-4xl">
          Ultimele bloguri
        </h2>
        <p className="mt-2 text-lg text-center leading-8 text-gray-600">
          Află cele mai recente noutăți și articole din blogul nostru.
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <NoData description="No posts available" />
        )}
      </div>
    </section>
  );
}
