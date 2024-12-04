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
      <div>
        <h2>Trends</h2>
        {trends.map((trend, index) => (
          <div key={index}>
            <h3>{trend.title}</h3>
            <p>{trend.description}</p>
          </div>
        ))}
      </div>
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
