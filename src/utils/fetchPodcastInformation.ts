import { PodcastEpisodeForAI } from "@/types/podcasts";
import { lookupPodcastEpisodes } from "./lookupPodcastEpisodes";

export const fetchPodcastInformation = async (id: string) => {
  const episodes = await lookupPodcastEpisodes(id);
  if (episodes?.length < 2) {
    //TODO - handle better
    console.error("No episodes found");
    throw new Error("No episodes found");
  }

  const episodesToUse = episodes.map((episode) => {
    const episodeForAI: PodcastEpisodeForAI = {
      description: episode.description,
      datePublished: episode.datePublished,
      transcripts: episode.transcripts,
    };
    return episodeForAI;
  });

  return episodesToUse;
};
