"use client";
import { useQuery } from "@tanstack/react-query";
import { generatePodcastRecommendation } from "@/utils/generatePodcastRecommendation";
import { lookupPodcast } from "@/utils/lookupPodcast";
import { useState } from "react";
import { fetchTrendingData } from "@/utils/fetchTrendingData";
import { fetchPodcastInformation } from "@/utils/fetchPodcastInformation";
import { fetchKeywords } from "@/utils/fetchKeywords";

export enum FetchStatus {
  PODCAST = "Fetching podcast information",
  KEYWORDS = "Generating relevant keywords",
  SEARCHING = "Searching the web",
  RECOMMENDATION = "Generating recommendation",
}

export const useRecommendation = (id: string) => {
  const [fetchStatus, setFetchStatus] = useState<FetchStatus | null>(null);

  const fetchRecommendation = async (id: string) => {
    const { title, description } = await lookupPodcast(id);

    // Fetch podcast information
    setFetchStatus(FetchStatus.PODCAST);
    const episodes = await fetchPodcastInformation(id);

    // Generate podcast keywords
    setFetchStatus(FetchStatus.KEYWORDS);
    const { keywords, summary } = await fetchKeywords(
      episodes,
      title,
      description
    );

    // Search the web for trending data
    setFetchStatus(FetchStatus.SEARCHING);
    const trendingData = await fetchTrendingData(keywords);

    // Generate recommendation
    setFetchStatus(FetchStatus.RECOMMENDATION);

    console.log("data sent is", {
      summary,
      description,
      keywords,
      trendingData,
    });

    const { response: recommendation, error: recommendationError } =
      await generatePodcastRecommendation(
        summary,
        description,
        keywords,
        trendingData
      );

    if (!recommendation || recommendationError) {
      //TODO - handle better
      console.error("No recommendation generated", recommendationError);
      throw new Error("No recommendation generated");
    }

    setFetchStatus(null);
    console.log("recommendation is", recommendation);
    return recommendation;
  };

  const {
    data: recommendation,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["recommendation", id],
    queryFn: async ({ queryKey }: { queryKey: [string, string] }) => {
      const [, id] = queryKey;
      const result = await fetchRecommendation(id);
      if (!result) {
        throw new Error("No recommendation generated");
      }

      return result;
    },
    retry: (failureCount) => failureCount < 1, // Retry once more if fails
    retryOnMount: false, // Don't retry on mount
    staleTime: 24 * 60 * 60 * 1000, // Cache results for 1 day
  });

  return {
    recommendation,
    error, // only show error if not fetching
    isLoading,
    fetchStatus,
  };
};
