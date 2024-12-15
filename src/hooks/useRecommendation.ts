"use client";
import { lookupPodcastEpisodes } from "@/utils/lookupPodcastEpisodes";
import { generatePodcastSummary } from "@/utils/generatePodcastSummary";
import { useQuery } from "@tanstack/react-query";
import { fetchTrendingRedditData } from "@/utils/fetchRedditData";
import { generatePodcastRecommendation } from "@/utils/generatePodcastRecommendation";
import { fetchMastadonData } from "@/utils/fetchMastadonData";

const fetchRecommendation = async (id: string) => {
  const episodes = await lookupPodcastEpisodes(id);
  if (episodes?.length < 2) {
    //TODO - handle better
    console.error("No episodes found");
    throw new Error("No episodes found");
  }

  const { response: summaryResponse, error: summaryError } =
    await generatePodcastSummary(episodes.slice(1)); // Remove the first episode, which is the podcast itself
  if (!summaryResponse || summaryError) {
    //TODO - handle better
    console.error("No summary generated", summaryError);
    throw new Error("No summary generated");
  }
  const { summary, keywords } = summaryResponse;

  const recentMastadonData = await fetchMastadonData(keywords);
  const trendingRedditData = await fetchTrendingRedditData(keywords);

  const { response: recommendationResponse, error: recommendationError } =
    await generatePodcastRecommendation(summary, keywords, {
      trendingRedditData,
      recentMastadonData,
    });

  if (!recommendationResponse || recommendationError) {
    //TODO - handle better
    console.error("No recommendation generated", recommendationError);
    throw new Error("No recommendation generated");
  }

  return recommendationResponse;
};

export const useRecommendation = (id: string) => {
  const {
    data: recommendation,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["recommendation", id],
    queryFn: async ({ queryKey }: { queryKey: [string, string] }) => {
      const [, id] = queryKey;
      const result = await fetchRecommendation(id);

      return result;
    },
    staleTime: 24 * 60 * 60 * 1000, // Cache results for 1 day
  });

  return { recommendation, error, isLoading };
};
