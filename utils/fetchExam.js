export async function fetchExam(slug, token) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/exams/exam/${slug}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.message,
        plan: errorData.plan || "Failed to fetch exam data",
      };
    }

    const exam = await response.json();
    return { exam };
  } catch (error) {
    return { error: error.message || "An unexpected error occurred" };
  }
}
