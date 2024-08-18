export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const staticRoutes = [
    { route: "", changeFrequency: "yearly", priority: 1.0 },
    { route: "about", changeFrequency: "monthly", priority: 0.8 },
    { route: "dashboard", changeFrequency: "monthly", priority: 0.8 },
    { route: "dashboard/exams", changeFrequency: "monthly", priority: 0.8 },
    { route: "dashboard/profile", changeFrequency: "monthly", priority: 0.8 },
  ];

  const dynamicRoutes = await getDynamicRoutes();

  const urls = [
    ...staticRoutes.map(({ route, changeFrequency, priority }) => ({
      url: `${baseUrl}/${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency,
      priority,
    })),
    ...dynamicRoutes.map(({ route, changeFrequency, priority }) => ({
      url: `${baseUrl}/${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency,
      priority,
    })),
  ];

  return urls;
}

async function getDynamicRoutes() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/exams`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch dynamic routes: ${response.statusText}`);
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      return data.map((exam) => ({
        route: `dashboard/exams/${exam.category?.title}/${exam.slug}`,
        changeFrequency: "weekly",
        priority: 0.8,
      }));
    } else {
      console.error("Expected an array, but got:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching dynamic routes:", error);
    return [];
  }
}
