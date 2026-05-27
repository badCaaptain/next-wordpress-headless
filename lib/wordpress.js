const WP_URL = process.env.WORDPRESS_URL;

export async function getToken() {
  const res = await fetch(`${WP_URL}/wp-json/jwt-auth/v1/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: process.env.WP_USERNAME,
      password: process.env.WP_PASSWORD,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("JWT token failed");
  }

  const data = await res.json();
  return data.token;
}

async function fetchAPI(endpoint, options = {}) {
  try {
    const token = await getToken();

    const res = await fetch(`${WP_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
  const data = await fetchAPI(`/wp-json/wp/v2/pages?slug=${slug}`);
  return data?.[0] || null;
}

export async function getMenuByLocation(location = "main-menu") {
  const data = await fetchAPI(`/wp-json/menus/v1/locations/${location}`);
  return data?.items || [];
}

export async function renderShortcode(shortcode) {
  if (!shortcode) return "";

  const data = await fetchAPI(`/wp-json/headless/v1/render-shortcode`, {
    method: "POST",
    body: JSON.stringify({ shortcode }),
  });

  return data?.html || "";
}