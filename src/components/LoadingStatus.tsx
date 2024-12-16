import { SorryAnimation, TappingFingers } from "@/assets/Animations";
import { FetchStatus } from "@/hooks/useRecommendation";
import { Recommendation } from "@/utils/generatePodcastRecommendation";

export const RecommendationStatus = ({
  status,
  recommendation,
  error,
}: {
  status: FetchStatus;
  recommendation: Recommendation | undefined;
  error: Error | null;
}) => {
  if (status !== FetchStatus.COMPLETE) {
    return <Status animation={<TappingFingers />} text={status} />;
  }

  if (!recommendation || error) {
    return (
      <Status
        animation={<SorryAnimation />}
        text="Sorry, something went wrong. Please try again later"
      />
    );
  }
  return;
};

const Status = ({
  animation,
  text,
}: {
  animation: React.JSX.Element;
  text: string;
}) => (
  <div className="flex flex-col justify-center items-center">
    <div className="w-32 h-32">{animation}</div>
    <div>{text}</div>
  </div>
);
