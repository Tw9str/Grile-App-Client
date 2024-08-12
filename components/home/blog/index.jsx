import React from "react";
import Post from "./Post";
import { posts } from "./posts";

export default function Blog() {
  return (
    <section
      id="blog"
      className="max-w-7xl mx-auto mt-20 pt-4 px-4 sm:px-6 md:px-8"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold text-center tracking-tight text-gray-900 sm:text-4xl">
          Latest blogs
        </h2>
        <p className="mt-2 text-lg text-center leading-8 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
