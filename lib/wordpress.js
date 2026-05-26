const WP_URL = process.env.WORDPRESS_URL;

async function fetchAPI(endpoint, options = {}) {
  try {
    const res = await fetch(`${WP_URL}${endpoint}`, {
      next: { revalidate: 5 },
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.log("WordPress API Error:", error);
    return null;
  }
}

export async function getPageBySlug(slug) {
  const data = await fetchAPI(
    `/wp-json/wp/v2/pages?slug=${slug}`
  );

  return data?.[0] || null;
}

export async function getMenuByLocation(
  location = "main-menu"
) {
  const data = await fetchAPI(
    `/wp-json/menus/v1/locations/${location}`
  );

  return data?.items || [];
}


export async function renderShortcode(shortcode) {
  if (!shortcode) return "";

  const res = await fetch(`${WP_URL}/wp-json/headless/v1/render-shortcode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shortcode }),
    next: { revalidate: 5 },
  });

  const data = await res.json();

  return data?.html || "";
}