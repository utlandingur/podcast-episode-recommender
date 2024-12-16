import { PodcastInfo } from "@/hooks/useRecommendation";
import { cn } from "@/lib/utils";
import Image from "next/image";

const customLoader = ({ src }: { src: string }) => {
  return src;
};

export const PodcastSummary = ({
  podcastInfo,
}: {
  podcastInfo: PodcastInfo;
}) => {
  const { title, keywords, summary, image, audience, niche } = podcastInfo;
  console.log("image", image);
  return (
    <>
      {title && (
        <div className={cn("flex flex-col gap-4 w-full")}>
          {image && (
            <Image
              className="bg-slate-300 h-[140px] w-[140px] rounded-lg"
              src={image}
              loader={customLoader}
              width={140}
              height={140}
              alt={"podcast image"}
            />
          )}
          <h1>{title}</h1>
          {summary && <p>{summary}</p>}
          {audience && (
            <>
              <h2>Audience</h2>
              <p>{audience}</p>
            </>
          )}
          {niche && (
            <>
              <h2>Niche</h2>
              <p>{niche}</p>
            </>
          )}
          {keywords && (
            <>
              <h2>Keywords Identified</h2>
              <ul className={cn("list-disc list-inside pl-2")}>
                {keywords.map((keyword, index) => (
                  <li key={index}>{keyword.toUpperCase()}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </>
  );
};
