import type { Podcast } from "@/types/podcasts";
import { generateHeaders } from "../serverActions/generatePodIndexHeaders";

export const lookupPodcasts = async (
  searchTerm: string,
  limit: number = 6
): Promise<Podcast[]> => {
  const url = new URL("https://api.podcastindex.org/api/1.0/search/byterm");
  url.searchParams.append("q", searchTerm);
  url.searchParams.append("max", limit + "");
  url.searchParams.append("fulltext", "true"); // If present, return the full text value of any text fields (ex: description). If not provided, field value is truncated to 100 words.

  const response = await fetch(url, {
    cache: "force-cache",
    headers: generateHeaders(),
    method: "GET",
  });
  const data = await response.json();

  return data.feeds;
};
