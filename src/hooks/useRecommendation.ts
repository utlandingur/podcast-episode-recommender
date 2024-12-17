"use client";
import { useQuery } from "@tanstack/react-query";
import { generatePodcastRecommendation } from "@/utils/generatePodcastRecommendation";
import { lookupPodcast } from "@/utils/lookupPodcast";
import { useState } from "react";
import { fetchTrendingData } from "@/utils/fetchTrendingData";
import { fetchPodcastInformation } from "@/utils/fetchPodcastInformation";
import { fetchKeywords } from "@/utils/fetchKeywords";
import { track } from "@vercel/analytics/react";

export enum FetchStatus {
  PODCAST = "Fetching podcast information",
  KEYWORDS = "Generating relevant keywords",
  SEARCHING = "Searching the web",
  RECOMMENDATION = "Generating recommendation",
  COMPLETE = "Recommendation generated",
}

export type PodcastInfo = {
  title: string | null;
  keywords: string[] | null;
  summary: string | null;
  image: string | null;
  audience: string | null;
  niche: string | null;
};

export const useRecommendation = (id: string) => {
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(
    FetchStatus.SEARCHING
  );
  const [podcastInfo, setPodcastInfo] = useState<PodcastInfo>({
    title: null,
    image: null,
    keywords: null,
    summary: null,
    audience: null,
    niche: null,
  });

  const fetchRecommendation = async (id: string) => {
    const { title, description, image } = await lookupPodcast(id);

    setPodcastInfo((prev) => ({ ...prev, title, image }));

    // Fetch podcast information
    setFetchStatus(FetchStatus.PODCAST);
    const episodes = await fetchPodcastInformation(id);

    // Generate podcast keywords
    setFetchStatus(FetchStatus.KEYWORDS);
    const { keywords, summary, audience, niche } = await fetchKeywords(
      episodes,
      title,
      description
    );
    setPodcastInfo((prev) => ({ ...prev, keywords, summary, audience, niche }));

    // Search the web for trending data
    setFetchStatus(FetchStatus.SEARCHING);
    const trendingData = await fetchTrendingData(keywords);

    // Generate recommendation
    setFetchStatus(FetchStatus.RECOMMENDATION);

    const { response: recommendation, error: recommendationError } =
      await generatePodcastRecommendation(
        summary,
        description,
        niche,
        audience,
        keywords,
        trendingData
      );

    if (!recommendation || recommendationError) {
      //TODO - handle better
      setFetchStatus(FetchStatus.COMPLETE);
      track("recommendation error", { id });
      console.error("No recommendation generated", recommendationError);
      throw new Error("No recommendation generated");
    }

    setFetchStatus(FetchStatus.COMPLETE);
    track("recommendation provided", { id });
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
    podcastInfo,
    error, // only show error if not fetching
    isLoading,
    fetchStatus,
  };
};
