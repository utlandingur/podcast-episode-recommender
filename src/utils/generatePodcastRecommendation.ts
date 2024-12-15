import { getGeminiResponse } from "@/serverActions/getGeminiResponse";
import type { InferSchema } from "@/types/gemini";
import { RedditPost } from "@/types/reddit";
import { createSchema } from "@/utils/geminiUtils";

import { SchemaType } from "@google/generative-ai";

const schemaProperties = {
  trends: {
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.OBJECT,
      properties: {
        description: {
          type: SchemaType.STRING,
          description: "Short string describing a trend",
        },
        title: {
          type: SchemaType.STRING,
          description: "Title of the trend",
        },
      },
      description: "Short string describing a trend",
    },
    description:
      "A list of 3-5 trending topics from Reddit that match the podcast's keywords",
  },
  recommendationSummary: {
    type: SchemaType.STRING,
    description: "A 2 paragraph summary of recommendations made and why",
  },
  recommendations: {
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.OBJECT,
      properties: {
        title: {
          type: SchemaType.STRING,
          description: "Title of the recommendation",
        },
        description: {
          type: SchemaType.STRING,
          description: "Description of the recommendation",
        },
      },
    },
    description:
      "A list of 2-3 recommendations for what the podcast should discuss next",
  },
} as const;

const schema = createSchema(
  "Provide specific recommendations for podcast creators on what they should discuss next on their specific podcast based on trending data. Be specific as much as possible rather than general. Minimum 200 words",
  schemaProperties
);

export type Recommendation = InferSchema<typeof schemaProperties>;

export const generatePodcastRecommendation = async (
  summary: string,
  keywords: string[],
  redditPosts: RedditPost[]
) => {
  return await getGeminiResponse<Recommendation>(schema, {
    summary,
    keywords,
    redditPosts,
  });
};
