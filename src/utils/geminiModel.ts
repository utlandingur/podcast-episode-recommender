import { InferSchema, SchemaProperties } from "@/types/gemini";
import {
  GenerativeModel,
  GoogleGenerativeAI,
  type ResponseSchema,
  SchemaType,
} from "@google/generative-ai";

const geminiModel = (
  responseSchema: ResponseSchema
): { model: GenerativeModel | undefined; error: string | undefined } => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) return { model: undefined, error: "No gemini API key" };

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseSchema,
        responseMimeType: "application/json",
      },
    });
    return { model, error: undefined };
  } catch (error) {
    return {
      model: undefined,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
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
  const { model, error } = geminiModel(schema);
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
