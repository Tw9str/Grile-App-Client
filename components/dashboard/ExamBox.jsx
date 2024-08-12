import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ExamBox({
  exam: { title, category, plan, user, createdAt, slug },
}) {
  const date = new Date(createdAt);
  return (
    <article className="grid items-center justify-center text-center bg-white p-4 rounded-xl border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <Link href={`/dashboard/exams/${category.title}/${slug}`}>
        <div className="text-2xl">📝</div>
        <h2 className="mt-4 text-xl font-bold text-gray-800 uppercase">
          {title}
        </h2>
        <div className="flex items-center gap-x-4 text-xs mt-4">
          <span className="rounded-full bg-green-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-green-200 uppercase">
            {category.title.replace(/-/g, " ")}
          </span>
          <span className="rounded-full bg-orange-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-orange-200 uppercase">
            {plan}
          </span>
        </div>
        <div className="relative mt-4 flex items-center gap-x-4">
          <div className="relative w-12 h-12">
            <Image className="rounded-full" src="/pc.jpg" alt="" fill />
          </div>
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-800">{user.username}</p>
            <time dateTime={createdAt} className="text-gray-500">
              {date.toLocaleDateString()}
            </time>
          </div>
        </div>
      </Link>
    </article>
  );
}
