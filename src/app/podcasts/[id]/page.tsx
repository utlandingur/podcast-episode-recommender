import { PodcastSearchBar } from "@/components/podcastSearchBar";
import { geistSans, geistMono } from "@/app/fonts";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { RecommendationOverview } from "@/components/recommendationOverview";
import { LoadingSpinner } from "@/components/ui/loadingSpinner";
import { lookupPodcast } from "@/utils/lookupPodcast";
import type { Metadata } from "next";

type Params = Promise<{
  id: string;
}>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  // read route params
  const id = (await params).id;

  const podcast = await lookupPodcast(id);

  if (!podcast) {
    return {
      title: "Podcast not found",
      description: "The podcast you're looking for could not be found.",
    };
  }
  const { title } = podcast;

  return {
    title: `Podcast episode ideas for ${title}`,
    description: `Generate ideas for your next podcast episode based on what's trending.`,
  };
}

export default async function PodcastPage({ params }: { params: Params }) {
  const id = (await params).id;

  const decodedId = decodeURIComponent(id);

  if (!decodedId) return <div>Page not found</div>;

  return (
    <main
      className={`flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased w-dvw h-dvh`}
    >
      <Suspense
        fallback={
          <div className="flex justify-center items-center">
            <LoadingSpinner />
          </div>
        }
      >
        <div className={cn("p-8")}>
          <PodcastSearchBar />
        </div>
        <div
          className={cn(
            "flex flex-col h-full w-full items-center justify-start sm:justify-center p-2 pb-8 sm:p-8 gap-8"
          )}
        >
          <RecommendationOverview id={decodedId} />
        </div>
      </Suspense>
    </main>
  );
}
