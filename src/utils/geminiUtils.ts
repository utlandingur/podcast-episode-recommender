import { createGeminiModel } from "@/serverActions/createGeminiModel";
import type { InferSchema, SchemaProperties } from "@/types/gemini";
import { type ResponseSchema, SchemaType } from "@google/generative-ai";

export const createSchema = (
  description: string,
  properties: SchemaProperties
): ResponseSchema => {
  return {
    description,
    type: SchemaType.OBJECT,
    properties,
    required: Object.keys(properties),
  };
};

export const generateContent = async <
  T extends InferSchema<SchemaProperties> // InferSchemaType<typeof schemaProperties>
>(
  schema: ResponseSchema,
  content: unknown
): Promise<
  | {
      response: undefined;
      error: string | undefined;
    }
  | {
      response: T;
      error: undefined;
    }
> => {
  const { model, error } = await createGeminiModel(schema);
  if (!model) {
    return { response: undefined, error };
  }
  try {
    const result = await model.generateContent(JSON.stringify(content));
    const text = await result.response.text();
    return { response: JSON.parse(text) as T, error: undefined };
  } catch (error) {
    return {
      response: undefined,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
