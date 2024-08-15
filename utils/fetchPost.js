export async function fetchPost(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/posts/${slug}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }
    const post = await res.json();
    return { post, error: null };
  } catch (error) {
    return { post: null, error: error.message };
  }
}
