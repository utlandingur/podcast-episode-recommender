import type { PodcastEpisode, PodcastEpisodeResponse } from "@/types/podcasts";
import { generateHeaders } from "../serverActions/generatePodIndexHeaders";

export const lookupPodcastEpisodes = async (
  id: string
): Promise<PodcastEpisode[]> => {
  const url = new URL("https://api.podcastindex.org/api/1.0/episodes/byfeedid");
  url.searchParams.append("id", id);
  url.searchParams.append("max", "100"); // Min 1, Max 1000
  url.searchParams.append("fulltext", "true"); // If present, return the full text value of any text fields (ex: description). If not provided, field value is truncated to 100 words.

  // const url = `https://itunes.apple.com/lookup?id=${collectionId}&entity=podcastEpisode`;
  const response = await fetch(url, {
    cache: "force-cache",
    headers: await generateHeaders(),
    method: "GET",
  });

  const data = await response.json();

  const episodes = data.items.map((item: PodcastEpisodeResponse) => {
    const {
      title,
      description,
      datePublished,
      episode,
      feedLanguage,
      transcriptUrl,
      transcripts,
    } = item;

    const podcastEpisode: PodcastEpisode = {
      collectionName: title,
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
