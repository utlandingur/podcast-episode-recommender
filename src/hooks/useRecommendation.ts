"use client";
import { lookupPodcastEpisodes } from "@/utils/lookupPodcastEpisodes";
import { generatePodcastSummary } from "@/utils/generatePodcastSummary";
import { useQuery } from "@tanstack/react-query";
import { fetchTrendingRedditData } from "@/utils/fetchRedditData";
import { generatePodcastRecommendation } from "@/utils/generatePodcastRecommendation";

import { fetchMastadonData } from "@/utils/fetchMastadonData";

import type { PodcastEpisodeForAI } from "@/types/podcasts";
import { lookupPodcast } from "@/utils/lookupPodcast";
import { useState } from "react";

export enum FetchStatus {
  PODCAST = "Fetching podcast information",
  KEYWORDS = "Generating relevant keywords",
  SEARCHING = "Searching the web",
  RECOMMENDATION = "Generating recommendation",
}

export const useRecommendation = (id: string) => {
  const [fetchStatus, setFetchStatus] = useState<FetchStatus | null>(null);

  const fetchRecommendation = async (id: string) => {
  const { description, title } = await lookupPodcast(id);
  
  // Fetch podcast information
  setFetchStatus(FetchStatus.PODCAST);

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
  
  // Generate podcast keywords
  setFetchStatus(FetchStatus.KEYWORDS);
    
  const { response: summaryResponse, error: summaryError } =
    await generatePodcastSummary(episodesToUse, title, description);

  if (!summaryResponse || summaryError) {
    //TODO - handle better
    console.error("No summary generated", summaryError);
    throw new Error("No summary generated");
  }
  const { summary, keywords } = summaryResponse;


  // Search the web for trending data
  setFetchStatus(FetchStatus.SEARCHING);
    
  const recentMastadonSearchData = await fetchMastadonData(keywords);
  const trendingRedditData = await fetchTrendingRedditData(keywords);

  // Generate recommendation
  setFetchStatus(FetchStatus.RECOMMENDATION);
    
  const { response: recommendationResponse, error: recommendationError } =
    await generatePodcastRecommendation(summary, description, keywords, {
      trendingRedditData,
      recentMastadonSearchData,
    });

  setFetchStatus(null);

  if (!recommendationResponse || recommendationError) {
    //TODO - handle better
    console.error("No recommendation generated", recommendationError);
    throw new Error("No recommendation generated");
  }

  return recommendationResponse;
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
