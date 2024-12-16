import type { PodcastEpisode, PodcastEpisodeResponse } from "@/types/podcasts";
import { getPodcastIndexHeaders } from "../serverActions/getPodcastIndexHeaders";

export const lookupPodcastEpisodes = async (
  id: string
): Promise<PodcastEpisode[]> => {
  const url = new URL("https://api.podcastindex.org/api/1.0/episodes/byfeedid");
  url.searchParams.append("id", id);
  url.searchParams.append("max", "100"); // Min 1, Max 1000
  url.searchParams.append("fulltext", "true"); // If present, return the full text value of any text fields (ex: description). If not provided, field value is truncated to 100 words.

  const response = await fetch(url, {
    cache: "force-cache",
    headers: await getPodcastIndexHeaders(),
    method: "GET",
  });

  const data = await response.json();

  const episodes = data.items.map((item: PodcastEpisodeResponse) => {
    const {
      description,
      datePublished,
      episode,
      feedLanguage,
      transcriptUrl,
      transcripts,
    } = item;

    const podcastEpisode: PodcastEpisode = {
      description,
      datePublished,
      episodeNumber: episode,
      language: feedLanguage,
      transcriptUrl,
      transcripts,
    };
    return podcastEpisode;
  });

  return episodes;
};
