import { cn } from "@/lib/utils";
import { Recommendation } from "@/utils/generatePodcastRecommendation";

import { LinksToSources } from "./linksToSources";

type PodcastSummaryProps = {
  recommendation: Recommendation | undefined;
};

export const PodcastRecommendation = ({
  recommendation,
}: PodcastSummaryProps) => {
  if (!recommendation) return;
  const { trends, episodeSuggestions } = recommendation;
  return (
    <div className={cn("text-left flex flex-col gap-6")}>
      <div>
        <h2>Trending Topics</h2>
        <p>
          A quick summary of the most relevant trending topics related to your
          podcast
        </p>
      </div>
      <div className={cn("flex flex-col gap-4")}>
        {trends.map((trend, index) => (
          <ul key={index}>
            <li>
              <p className={cn("font-semibold text-xl")}>
                {trend.emoticon + " " + trend.title + ": "}
              </p>
              <p>{trend.description}</p>
              <LinksToSources
                sources={trend.linkToSources}
                name={trend.title}
              />
            </li>
          </ul>
        ))}
      </div>
      <div className={cn("flex flex-col gap-4")}>
        <h2>Recommendations</h2>
        {episodeSuggestions.map((suggestion, index) => (
          <div key={index}>
            <h3>{suggestion.emoticon + " " + suggestion.title + ": "}</h3>
            <p>{suggestion.description}</p>
            <LinksToSources
              sources={suggestion.linksToSources}
              name={suggestion.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
