import { PodcastSearchBar } from "@/components/podcastSearchBar";

import { Suspense } from "react";

import { HowItWorks } from "@/components/howItWorks";
import { geistMono, geistSans } from "../fonts";
import { cn } from "@/lib/utils";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works - Podmore",
  description:
    "Discover how Podmore helps you generate fresh podcast episode ideas with ease. Search your podcast and get inspired by tailored suggestions based on trends and listener interests.",
  keywords: [
    "how it works podcast ideas",
    "generate podcast episode ideas",
    "podcast inspiration tool",
    "how to get podcast ideas",
    "podcast episode suggestions",
    "AI podcast idea generator",
  ],
  openGraph: {
    title: "How It Works - Podmore",
    description:
      "Learn how to use Podmore to generate creative podcast episode ideas. Tailored recommendations for your show based on trends and listener interests.",
    url: "https://podmore.com/how-it-works",
    siteName: "Podmore",
    // Uncomment and replace with an actual image URL for SEO optimization
    // images: [
    //   {
    //     url: "https://podmore.com/images/og-how-it-works.jpg", // Replace with a relevant image
    //     width: 1200,
    //     height: 630,
    //     alt: "How it Works - Podmore", // Alt text for the image
    //   },
    // ],
  },
  twitter: {
    card: "summary", // Use a larger image if available for better visibility
    title: "How It Works - Podmore",
    description:
      "Use Podmore to generate podcast episode ideas tailored to your show. Get inspired by creative, trend-based suggestions!",
    // Uncomment and replace with a relevant Twitter card image
    // images: ["https://podmore.com/images/og-how-it-works.jpg"], // Image for Twitter card
  },
};

export default async function HowItWorksPage() {
  return (
    <main
      className={`flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased w-dvw h-full  items-center justify-start sm:justify-center p-8 sm:px-4 text-center`}
    >
      <div
        className={cn("max-w-[600px] flex flex-col gap-8 p-4 sm:px-4 w-full")}
      >
        <h1>Search for a podcast to download</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <div className={cn("p-4")}>
            <PodcastSearchBar />
          </div>
        </Suspense>

        <HowItWorks />
      </div>
    </main>
  );
}
