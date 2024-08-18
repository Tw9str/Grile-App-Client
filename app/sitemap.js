export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const staticRoutes = [
    { route: "", changeFrequency: "yearly", priority: 1.0 },
    { route: "about", changeFrequency: "monthly", priority: 0.8 },
    { route: "dashboard", changeFrequency: "monthly", priority: 0.8 },
    { route: "dashboard/exams", changeFrequency: "monthly", priority: 0.8 },
    { route: "dashboard/profile", changeFrequency: "monthly", priority: 0.8 },
  ];

  const urls = [
    ...staticRoutes.map(({ route, changeFrequency, priority }) => ({
      url: `${baseUrl}/${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency,
      priority,
    })),
  ];

  return urls;
}
