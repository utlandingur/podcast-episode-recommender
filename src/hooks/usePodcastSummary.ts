import { lookupPodcastSummary } from "@/serverActions/lookupPodcastSummary";
import { PodcastEpisode } from "@/types/podcasts";
import { useQuery } from "@tanstack/react-query";

export const usePodcastSummary = (id: string, episodes: PodcastEpisode[]) => {
  const { data, error } = useQuery({
    queryKey: ["podcastKeywords", id],
    queryFn: async () => {
      const keywords = await lookupPodcastSummary(episodes.slice(0, 50));
      if (!keywords) return undefined;
      return keywords;
    },
    staleTime: 24 * 60 * 60 * 1000, // Cache results for 1 day
  });

  return { data, error };
};
