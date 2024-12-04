import { Recommendation } from "@/utils/generatePodcastRecommendation";

type PodcastSummaryProps = {
  recommendation: Recommendation;
};

export const PodcastSummary = ({ recommendation }: PodcastSummaryProps) => {
  const { trends, recommendationSummary, recommendations } = recommendation;
  return (
    <div>
      <h1>Podcast Summary stuff</h1>
      <h2>Recommendation summary</h2>
      <p>{recommendationSummary}</p>
      <h2>Trends</h2>
      <ul>
        {trends.map((trend) => (
          <li key={trend}>{trend}</li>
        ))}
      </ul>
      <h2>Recommendations</h2>
      <div>
        {recommendations.map((suggestion, index) => (
          <div key={index}>
            <h3>{suggestion.title}</h3>
            <p>{suggestion.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
