"use client";
import { usePodcastEpisodes } from "@/hooks/usePodcastData";
import { LoadingSpinner } from "./ui/loadingSpinner";
import { PodcastSummary } from "./podcastSummary";

type RecommendationOverviewProps = {
  id: string;
};

export const RecommendationOverview = ({ id }: RecommendationOverviewProps) => {
  const { data: podcastEpisodes } = usePodcastEpisodes(id);

  // TODO: Pass this to AI to get keywords and short summary of podcast

  // then return keywords
  // const { data } =

  // Here is where we grab the data from the APIs

  if (!podcastEpisodes)
    return (
      <div className="flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  const podCastName = podcastEpisodes[0].collectionName;
  return (
    <>
      <h1>{podCastName}</h1>
      <PodcastSummary id={id} podcastEpisodes={podcastEpisodes} />
      <p className="text-center">{`Download your favourite podcast episodes from ${podCastName} as an mp3 file.`}</p>
    </>
  );
};
