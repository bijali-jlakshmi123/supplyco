const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function fetchStrapi(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    next: { revalidate: 60 }, // Revalidate every minute
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(
      `Strapi API error: ${res.status} ${res.statusText} - ${JSON.stringify(error)}`,
    );
  }

  return res.json();
}

/**
 * Strapi 5 returns data in a flattened format or within a 'data' wrapper.
 * This helper ensures we get the array or object we expect.
 */
export function getStrapiData(response: any) {
  if (response?.data) return response.data;
  return response;
}
