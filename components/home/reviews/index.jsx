"use client";

import React, { useEffect, useState } from "react";
import Review from "./Review";
import LoadingSpinner from "@/components/widgets/LoadingSpinner";
import NoData from "@/components/shared/NoData";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: null });

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/reviews`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const fetchedReviews = await res.json();
        setReviews(fetchedReviews.filter((review) => review.isApproved));
        setStatus({ loading: false, error: null });
      } catch (err) {
        setStatus({ loading: false, error: err.message });
      }
    }

    loadReviews();
  }, []);

  if (status.loading) {
    return <LoadingSpinner />;
  }

  if (status.error) {
    return <NoData description={status.error} />;
  }

  return (
    <section
      id="reviews"
      className="max-w-7xl mx-auto mt-20 pt-4 px-4 sm:px-6 md:px-8"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="text-lg font-semibold p-2 w-fit mx-auto text-green-500">
          Clientii nostri
        </h2>
        <p className="text-center text-xl text-neutral-600 max-w-2xl mx-auto mt-4">
          Acestea sunt recenziile foștilor clienți. Toți studenți acum.
        </p>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Review
              key={review._id}
              message={review.message}
              username={review.user?.username}
              avatarUrl={review.user?.avatarUrl || "/pc.jpg"}
            />
          ))
        ) : (
          <NoData description="No reviews available" />
        )}
      </div>
    </section>
  );
}
