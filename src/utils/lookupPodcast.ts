import type { Podcast } from "@/types/podcasts";
import { getPodcastIndexHeaders } from "../serverActions/getPodcastIndexHeaders";

export const lookupPodcast = async (id: string): Promise<Podcast> => {
  const url = new URL(
    "https://api.podcastindex.org/api/1.0//podcasts/byfeedid"
  );
  url.searchParams.append("id", id);
  url.searchParams.append("fulltext", "true"); // If present, return the full text value of any text fields (ex: description). If not provided, field value is truncated to 100 words.

  const response = await fetch(url, {
    cache: "force-cache",
    headers: await getPodcastIndexHeaders(),
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch podcast information");
  }

  const data = await response.json();

  return data.feed;
};
