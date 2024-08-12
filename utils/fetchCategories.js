export async function fetchCategories() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/categories`,
      { cache: "no-store" }
    );

    return response.json();
  } catch (e) {
    console.log(e);
  }
}
