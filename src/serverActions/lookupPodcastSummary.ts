import type { InferSchema } from "@/types/gemini";
import type { PodcastEpisode } from "@/types/podcasts";
import { createSchema, generateContent } from "@/utils/geminiModel";
import { SchemaType } from "@google/generative-ai";

const schemaProperties = {
  summary: {
    type: SchemaType.STRING,
    description: "A 2-4 line summary of the podcast, incl frequency & niche",
  },
  keywords: {
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.STRING,
    },
    description: "An array of 4 keywords describing the podcast's main niches",
  },
} as const;

const schema = createSchema(
  "Review and analyse the JSON that contains information about a podcast. Then provide a summary of the podcast and specific keywords to describe it that will be used to gather trend information from online sources to recommend what their next episodes should be about and why (in order to maximise audience growth)",
  schemaProperties
);

export const lookupPodcastSummary = async (episodes: PodcastEpisode[]) => {
  return await generateContent<InferSchema<typeof schemaProperties>>(
    schema,
    episodes
  );
};

// export type EpisodeSearchInfo = {
//   trackName: string;
//   releaseDate: Date;
//   trackTimeMillis: number;
// };

// export type PodcastKeywordSearchInfo = {
//   collectionName: string;
//   episodes: EpisodeSearchInfo[];
// };
