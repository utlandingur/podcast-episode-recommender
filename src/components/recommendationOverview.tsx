"use client";
import { PodcastRecommendation } from "./podcastRecommendation";
import { useRecommendation } from "@/hooks/useRecommendation";
import { RecommendationStatus } from "./LoadingStatus";
import { PodcastSummary } from "./podcastSummary";
import { cn } from "@/lib/utils";

type RecommendationOverviewProps = {
  id: string;
};

export const RecommendationOverview = ({ id }: RecommendationOverviewProps) => {
  const { recommendation, error, fetchStatus, podcastInfo } =
    useRecommendation(id);

  return (
    <div className={cn("max-w-dvw flex flex-col gap-16 p-4")}>
      <PodcastSummary podcastInfo={podcastInfo} />
      <RecommendationStatus
        status={fetchStatus}
        error={error}
        recommendation={recommendation}
      />
      <PodcastRecommendation recommendation={recommendation} />
    </div>
  );
};
