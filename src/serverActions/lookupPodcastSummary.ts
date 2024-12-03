// import type { InferSchemaType } from "@/types/gemini";
import type { InferSchemaType } from "@/types/gemini";
import type { PodcastEpisode } from "@/types/podcasts";
import { geminiModel } from "@/utils/geminiModel";
import { type ResponseSchema, SchemaType } from "@google/generative-ai";

const podcastKeywordProperties = {
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

const podcastKeywordSchema: ResponseSchema = {
  description:
    "Review and analyse the JSON that contains information about a podcast. Then provide a summary of the podcast and specific keywords to describe it that will be used to gather trend information from online sources to recommend what their next episodes should be about and why (in order to maximise audience growth)",
  type: SchemaType.OBJECT,
  properties: podcastKeywordProperties,
  required: ["summary", "keywords"],
};

type PodcastKeywordResponse = InferSchemaType<typeof podcastKeywordProperties>;

export type EpisodeSearchInfo = {
  trackName: string;
  releaseDate: Date;
  trackTimeMillis: number;
};

export type PodcastKeywordSearchInfo = {
  collectionName: string;
  episodes: EpisodeSearchInfo[];
};

export type PodcastSummary = {
  response: PodcastKeywordResponse | undefined;
  error: string | undefined;
};

export const lookupPodcastSummary = async (
  episodes: PodcastEpisode[]
): Promise<PodcastSummary> => {
  const { model, error } = geminiModel(podcastKeywordSchema);
  if (!model) {
    return { response: undefined, error };
  }
  try {
    const result = await model.generateContent(JSON.stringify(episodes));
    const text = result.response.text();
    return { response: JSON.parse(text), error: undefined };
  } catch (error) {
    return {
      response: undefined,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
