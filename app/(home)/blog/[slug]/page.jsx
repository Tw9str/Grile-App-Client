"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { fetchPost } from "@/utils/fetchPost";
import LoadingSpinner from "@/components/widgets/LoadingSpinner";
import NoData from "@/components/shared/NoData";

export default function Blog({ params }) {
  const slug = params.slug;

  const [postData, setPostData] = useState({ post: null, error: null });

  useEffect(() => {
    async function fetchData() {
      if (slug) {
        const fetchedPostData = await fetchPost(slug);
        setPostData(fetchedPostData);
      }
    }

    fetchData();
  }, []);

  const { post, error } = postData;

  if (error) {
    return <NoData description={error} />;
  }

  if (!post) {
    return <LoadingSpinner />;
  }
  return (
    <section
      id="post"
      className="max-w-4xl mx-auto mt-20 pt-4 px-4 sm:px-6 md:px-8 border border-neutral-100 rounded-lg p-4"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{post?.title}</h1>
        <div className="flex items-center gap-x-4 text-xs mt-4">
          <time dateTime={post.datetime} className="text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </time>
          <Link
            href={`/blog/${slug}`}
            className="rounded-full bg-green-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-green-200"
          >
            {post.title}
          </Link>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden mb-8">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE}/${
            post?.image || "/pc.jpg"
          }`}
          alt={post?.title}
          width={1280}
          height={720}
        />
      </div>

      <article className="prose lg:prose-xl text-gray-600 whitespace-pre-wrap">
        <p>{post?.content}</p>
      </article>

      <div className="w-fit mt-10 flex items-center gap-x-4">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE}/${
            post?.image || "/pc.jpg"
          }`}
          alt={post?.author?.username}
          className="rounded-full bg-green-100 h-10 w-10"
          width={40}
          height={40}
        />
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <Link href={`/blog/${slug}`}>
              {post?.author?.username || "Unknown"}
            </Link>
          </p>
          <p className="text-gray-600">{post?.author?.role}</p>
        </div>
      </div>
    </section>
  );
}
