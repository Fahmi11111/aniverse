const BASE_URL = "https://api.jikan.moe/v4";

const getAnimeResponse = async (resource, query = "") => {
  if (!resource || resource.includes("undefined")) return null;

  const url = query
    ? `${BASE_URL}/${resource}?${query}`
    : `${BASE_URL}/${resource}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("FETCH FAILED:", err);
    return null;
  }
};

export default getAnimeResponse;

export const getNestedAnimeResponse = async (resource, objectProperty) => {
  const response = await getAnimeResponse(resource);

  if (!response || !response.data) return [];

  return response.data.flatMap((item) => item?.[objectProperty] ?? []);
};

export const reproduce = (data, gap) => {
  if (!data || data.length === 0) return { data: [] };

  const first = Math.floor(Math.random() * (data.length - gap));
  const last = first + gap;

  return {
    data: data.slice(first, last),
  };
};
