"use client";
import { PodcastSummary } from "./podcastSummary";
import { FetchStatus, useRecommendation } from "@/hooks/useRecommendation";
import { SorryAnimation, TappingFingers } from "@/assets/Animations";

type RecommendationOverviewProps = {
  id: string;
};

export const RecommendationOverview = ({ id }: RecommendationOverviewProps) => {
  const { recommendation, error, fetchStatus } = useRecommendation(id);

  if (error) return <Sorry />;

  if (fetchStatus) return <Loading status={fetchStatus} />;

  if (!recommendation) return <Sorry />;

  return (
    <>
      <h1>Recommendation</h1>
      <PodcastSummary recommendation={recommendation} />
    </>
  );
};

const Sorry = () => (
  <div className="flex flex-col justify-center items-center">
    <div className="w-32 h-32">
      <SorryAnimation />
    </div>
    <div>Sorry, something went wrong. Please try again later</div>
  </div>
);

const Loading = ({ status }: { status: FetchStatus }) => (
  <div className="flex flex-col justify-center items-center">
    <div className="w-32 h-32">
      <TappingFingers />
    </div>
    <div>{status}</div>
  </div>
);
