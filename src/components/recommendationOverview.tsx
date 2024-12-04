"use client";
import { LoadingSpinner } from "./ui/loadingSpinner";
import { PodcastSummary } from "./podcastSummary";
import { useRecommendation } from "@/hooks/useRecommendation";

type RecommendationOverviewProps = {
  id: string;
};

export const RecommendationOverview = ({ id }: RecommendationOverviewProps) => {
  const { recommendation, error, isLoading } = useRecommendation(id);

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  // TODO - handle better
  if (error || !recommendation) return <div>Sorry, there was an error</div>;

  return (
    <>
      <h1>Recommendation</h1>
      <PodcastSummary recommendation={recommendation} />
    </>
  );
};
