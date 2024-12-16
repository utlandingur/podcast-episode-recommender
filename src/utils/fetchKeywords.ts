import { PodcastEpisodeForAI } from "@/types/podcasts";
import { generatePodcastSummary } from "./generatePodcastSummary";

export const fetchKeywords = async (
  episodes: PodcastEpisodeForAI[],
  title: string,
  description: string
) => {
  const { response, error } = await generatePodcastSummary(
    episodes,
    title,
    description
  );

  if (!response || error) {
    //TODO - handle better
    console.error("No summary generated", error);
    throw new Error("No summary generated");
  }
  const { keywords, summary } = response;

  if (!keywords?.length) {
    //TODO - handle better
    console.error("No keywords generated");
    throw new Error("No keywords generated");
  }

  return { keywords, summary };
};
