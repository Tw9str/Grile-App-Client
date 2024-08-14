export async function fetchCategoryExams(title, token) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/exams/category/${title}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.message || "Failed to fetch category exams data",
        plan: errorData.plan || null,
      };
    }

    const exams = await response.json();
    return { exams };
  } catch (error) {
    return { error: error.message || "An unexpected error occurred" };
  }
}
