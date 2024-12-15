"use client";
import type { InferSchema } from "@/types/gemini";
import type { PodcastEpisodeForAI } from "@/types/podcasts";

import { SchemaType } from "@google/generative-ai";
import { createSchema, generateContent } from "./geminiUtils";

const schemaProperties = {
  summary: {
    type: SchemaType.STRING,
    description:
      "A paragraphy summary of the topics recommended for discussion for the podcast's niche.",
  },
  keywords: {
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.STRING,
    },
    description: "4 keywords describing the podcast's primary niches",
  },
} as const;

const schema = createSchema(
  "Review and analyse the JSON that contains information about a podcast. Then provide a summary of the podcast and specific keywords to describe it that will be used to gather trend information from online sources to recommend what their next episodes should be about and why (in order to maximise audience growth)",
  schemaProperties
);

/**
 * Generates a summary and specific keywords for a podcast.
 *
 * @param {PodcastEpisodeForAI[]} episodes - An array of podcast episodes to be analyzed.
 * @param {string} podcastName - The name of the podcast.
 * @returns {Promise<InferSchema<typeof schemaProperties>>} A promise that resolves to the generated summary and keywords.
 */
export const generatePodcastSummary = async (
  episodes: PodcastEpisodeForAI[],
  podcastName: string
) => {
  return await generateContent<InferSchema<typeof schemaProperties>>(schema, {
    episodes,
    podcastName, // ensures the model has the podcast name
  });
};
