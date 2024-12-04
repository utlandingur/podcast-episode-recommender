import { generatePodcastSummary } from "@/utils/generatePodcastSummary";
import { PodcastEpisode } from "@/types/podcasts";
import { useQuery } from "@tanstack/react-query";

export const usePodcastSummary = (id: string, episodes: PodcastEpisode[]) => {
  const { data, error } = useQuery({
    queryKey: ["podcastKeywords", id],
    queryFn: async () => {
      const { response, error } = await generatePodcastSummary(
        episodes.slice(0, 50)
      );

      if (error) {
        throw new Error(error);
      }
      return response;
    },
    staleTime: 24 * 60 * 60 * 1000, // Cache results for 1 day
  });

  return { data, error };
};
