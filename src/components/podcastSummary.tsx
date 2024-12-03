import { usePodcastSummary } from "@/hooks/usePodcastSummary";
import { PodcastEpisode } from "../../podcast-downloader/src/types/podcasts";
import { useEffect } from "react";

type PodcastSummaryProps = {
  id: string;
  podcastEpisodes: PodcastEpisode[];
};

export const PodcastSummary = ({
  id,
  podcastEpisodes,
}: PodcastSummaryProps) => {
  const { data: podcastSummary } = usePodcastSummary(id, podcastEpisodes);
  useEffect(() => {
    console.log("podcast episodes are:", podcastEpisodes);
    console.log("podcast summary is:", podcastSummary);
  }, [podcastEpisodes, podcastSummary]);
  return (
    <div>
      <p>{podcastSummary?.response?.summary}</p>
      <h2>Keywords:</h2>
      <ul>
        {podcastSummary?.response?.keywords.map((keyword, index) => (
          <li key={index}>{keyword}</li>
        ))}
      </ul>
    </div>
  );
};
