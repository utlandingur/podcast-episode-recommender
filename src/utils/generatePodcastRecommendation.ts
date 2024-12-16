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
          description: "Short description including why relevant",
          maxLength: 300,
        },
        title: {
          type: SchemaType.STRING,
          description: "Subheading for trend",
          maxLength: 50,
        },
        linkToSources: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.STRING,
          },
          description: "Links to provided sources that support trend",
          minItems: 1,
          maxItems: 3,
        },
      },
    },
    description:
      "A list of trending topics that podcast creators may want to investigate",
    minItems: 3,
    maxItems: 5,
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
        linksToSources: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.STRING,
          },
          description: "Links to provided sources that support recommendation",
          minItems: 1,
          maxItems: 3,
        },
      },
    },
    description:
      "Recommendations for podcast creators next episodes based on trends",
  },
} as const;

const schema = createSchema(
  "Generate highly specific and actionable recommendations for podcast creators about what they should discuss next on their podcast. Base your suggestions on current trending data, tailoring them to the podcast's niche or theme. Avoid generalizations and focus on providing detailed and targeted ideas. Include insights that are directly relevant to the podcast's audience and current interests.",
  schemaProperties
);

export type Recommendation = InferSchema<typeof schemaProperties>;

/**
 * Generates a summary and specific keywords for a podcast.
 *
 * @param {string} summary - A summary of the podcast.
 * @param {string} description - The description of the podcast.
 * @param {string[]} keywords - Keywords for the podcast.
 * @returns {RedditPost[]} - A list of relevant Reddit posts.
 */
export const generatePodcastRecommendation = async (
  summary: string,
  description: string,
  keywords: string[],
  redditPosts: RedditPost[]
) => {
  return await getGeminiResponse<Recommendation>(schema, {
    summary,
    description,
    keywords,
    redditPosts,
  });
};
