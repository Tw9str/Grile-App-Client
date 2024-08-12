export async function fetchExam(slug) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/exams/exam/${slug}`,
      {
        cache: "no-store",
      }
    );
    return response.json();
  } catch (error) {
    console.error("Error fetching exam:", error);
  }
}
