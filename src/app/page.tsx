import { PodcastSearchBar } from "@/components/podcastSearchBar";

import { geistSans, geistMono } from "./fonts";
import { Suspense } from "react";
import { cn } from "@/lib/utils";

import type { Metadata } from "next";
import { HowItWorks } from "@/components/howItWorks";

export const metadata: Metadata = {
  title: "Podcast Episode Ideas - Tailored Suggestions for Your Show",
  description:
    "Get unique, niche-specific episode ideas for your podcast with ease with Podmore. Just search for your podcast name, and discover highly-targeted topics to engage your audience!",
  keywords: [
    "podcast episode ideas",
    "podcast topics generator",
    "niche podcast suggestions",
    "podcast episode planner",
    "trending podcast topics",
    "generate podcast topics",
  ],
  openGraph: {
    title: "Podcast Episode Ideas - Tailored Suggestions for Your Show",
    description:
      "Generate targeted episode ideas for your podcast in seconds. Discover trending topics and recommendations tailored to your audience!",
    url: "BLANK", //TODO: GET URL
    siteName: "Podcast Episode Ideas",
  },
  twitter: {
    card: "summary",
    title: "Podcast Episode Ideas - Tailored Suggestions for Your Show",
    description:
      "Find trending and niche-specific ideas for your next podcast episode. Start by searching your podcast name!",
  },
};

export default async function Home() {
  return (
    <main
      className={`flex flex-col gap-8 ${geistSans.variable} ${geistMono.variable} antialiased w-dvw h-full items-center justify-center sm:justify-center p-8 sm:px-4 text-center`}
    >
      <div
        className={cn("max-w-[600px] flex flex-col gap-8 p-4 sm:px-4 w-full")}
      >
        <h1>Generate Podcast Episode Ideas</h1>
        <p>
          Discover tailored, trending topics for your next podcast episode. Our
          tool analyzes your podcast&apos;s niche and audience to recommend
          highly relevant ideas. Perfect for keeping your content fresh and
          engaging!
        </p>
        <section id="how-it-works" className={cn("m-y-2 flex flex-col gap-4")}>
          <h2>How It Works</h2>
          <p>
            1. Search for your podcast name. That&apos;s it. <br />
          </p>
          <p>
            It&apos;s effortless! Let us do the heavy lifting while you focus on
            creating amazing content.
          </p>
        </section>
        <Suspense fallback={<div>Loading...</div>}>
          <div className={cn("")}>
            <PodcastSearchBar />
          </div>
        </Suspense>
        <HowItWorks />
      </div>
    </main>
  );
}
