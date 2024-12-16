import { getGeminiResponse } from "@/serverActions/getGeminiResponse";
import type { InferSchema } from "@/types/gemini";
import { SchemaType } from "@google/generative-ai";
import { createSchema } from "@/utils/geminiUtils";

const schemaProperties = {
  trends: {
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.OBJECT,
      properties: {
        description: {
          type: SchemaType.STRING,
          description: "Concise, impactful description of specific trends",
          maxLength: 60,
        },
        emoticon: {
          type: SchemaType.STRING,
          description:
            "A string representing an emoticon using Unicode characters, such as '😊' or '😂'",
        },
        title: {
          type: SchemaType.STRING,
          maxLength: 20,
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
      'Avoid generic headlines like "British Comedy." Instead, provide concise and unique ideas such as "Emerging satire trends in Gen Z comedy 🎭" or "How TikTok creators are reshaping British stand-up 🎤."',
    minItems: 3,
    maxItems: 5,
  },
  episodeSuggestions: {
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
        emoticon: {
          type: SchemaType.STRING,
          description:
            "A string representing an emoticon using Unicode characters, such as '😊' or '😂'",
        },
        linksToSources: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.STRING,
          },
          description:
            "Links to provided sources that support recommendation. Use a combination of sources if possible.",
          minItems: 1,
          maxItems: 3,
        },
      },
    },
    minItems: 3,
    maxItems: 3,
    description:
      "Generate highly specific episode suggestions for podcast creators targeting their target audience. Assume they produce podcasts about their specific niche. Their listeners expect innovative, in-depth conversations supported by current trends. Explain how they connect to the provided input",
  },
} as const;

const schema = createSchema(
  "Analyze current trending data, identifying unique and niche-specific topics with supporting context from credible sources. Provide future episode suggestions that reflect audience preferences, include surprising insights, and align with current cultural moments. If trending data lacks niche-specific insights, recommend a unique angle or overlooked topic that aligns with the keywords and audience preferences.",
  schemaProperties
);

export type Recommendation = InferSchema<typeof schemaProperties>;

/**
 * Generates a summary and specific keywords for a podcast.
 *
 * @param {string} summary - A summary of the podcast.
 * @param {string} description - The description of the podcast.
 * @param {string[]} keywords - Keywords for the podcast.
 * @returns {Recommendation} - A recommendation of what should be talked about next
 */
export const generatePodcastRecommendation = async (
  summary: string,
  description: string,
  niche: string,
  audience: string,
  keywords: string[],
  content: unknown // TODO: Use a better type here
) => {
  return await getGeminiResponse<Recommendation>(schema, {
    summary,
    description,
    niche,
    audience,
    keywords,
    content,
  });
};
