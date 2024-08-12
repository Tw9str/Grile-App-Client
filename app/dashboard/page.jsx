"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import NoData from "@/components/shared/NoData";
import ExamBox from "@/components/dashboard/ExamBox";
import LoadingSpinner from "@/components/widgets/LoadingSpinner";
import { useSelector } from "react-redux";
import PortalButton from "@/components/shared/buttons/PortalButton";

export default function Dashboard() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  // Fetch the latest 8 exams from the API
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/exams`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch exams");
        }
        const data = await response.json();
        setExams(data.slice(0, 8)); // Ensure only 8 exams are displayed
      } catch (error) {
        console.error("Error fetching exams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex-1 p-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.username}</h1>
          <p className="text-gray-600">
            Explore recent exams and manage your account effortlessly!
          </p>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-center">Dashboard</h1>

      {/* Enhanced Quick Access Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link
          href="/dashboard/profile"
          className="flex flex-col items-center md:items-start justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:bg-gray-50 transition duration-200"
        >
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
            <span className="text-2xl">👤</span>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Profile</h3>
          <p className="text-center md:text-left mt-2 text-sm text-gray-600">
            View and update your profile details
          </p>
        </Link>
        <Link
          href="/dashboard"
          className="flex flex-col items-center md:items-start justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:bg-gray-50 transition duration-200"
        >
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <span className="text-2xl">⚙️</span>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Settings</h3>
          <p className="text-center md:text-left mt-2 text-sm text-gray-600">
            Update your preferences and account details
          </p>
        </Link>
        <PortalButton token={token} user={user}>
          <div className="flex flex-col items-center md:items-start justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:bg-gray-50 transition duration-200">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
              <span className=" text-2xl">💳</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              {user?.plan === "free" ? "Upgrade" : "Subscription"}
            </h3>
            <p className="text-center md:text-left mt-2 text-sm text-gray-600">
              {user?.plan === "free"
                ? "Upgrade to a premium plan for more features"
                : "Manage your subscription and payment details"}
            </p>
          </div>
        </PortalButton>
        <Link
          href="/dashboard/exams"
          className="flex flex-col items-center md:items-start justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:bg-gray-50 transition duration-200"
        >
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100">
            <span className="text-2xl">📝</span>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Exams</h3>
          <p className="text-center md:text-left mt-2 text-sm text-gray-600">
            View and manage your exams
          </p>
        </Link>
      </div>

      {/* Latest Exams Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Latest Exams</h2>
        {exams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {exams.map((exam) => (
              <ExamBox key={exam._id} exam={exam} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64 w-full">
            <NoData description={"No Exams available."} />
          </div>
        )}
      </div>
      {/* Latest Blogs Section */}
      {/* 
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Latest Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestBlogs.map((blog) => (
            <article
              key={blog.id}
              className="mx-auto flex max-w-xl flex-col items-start justify-between bg-white p-4 rounded-xl border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <Link href={`/dashboard/blogs/${blog.slug}`}>
                <div className="rounded-xl overflow-hidden mb-4">
                  <Image
                    src={blog.author.imageUrl}
                    alt={blog.title}
                    width={640}
                    height={360}
                    layout="responsive"
                  />
                </div>
                <div className="flex items-center gap-x-4 text-xs mb-4">
                  <time dateTime={blog.createdAt} className="text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </time>
                  <Link
                    href={blog.category.href}
                    className="relative z-10 rounded-full bg-green-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-green-200"
                  >
                    {blog.category.title}
                  </Link>
                </div>
                <div className="group relative">
                  <h3 className="text-xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    {blog.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                    {blog.excerpt}
                  </p>
                </div>
                <div className="relative mt-6 flex items-center gap-x-4">
                  <Image
                    src={blog.author.imageUrl}
                    alt={blog.author.name}
                    className="rounded-full bg-green-100"
                    width={40}
                    height={40}
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <Link href={blog.author.href}>{blog.author.name}</Link>
                    </p>
                    <p className="text-gray-600">{blog.author.role}</p>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
      */}
    </div>
  );
}
