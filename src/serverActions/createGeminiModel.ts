"use server";
import {
  GenerativeModel,
  GoogleGenerativeAI,
  type ResponseSchema,
} from "@google/generative-ai";

export const createGeminiModel = async (
  responseSchema: ResponseSchema
): Promise<{
  model: GenerativeModel | undefined;
  error: string | undefined;
}> => {
  const apiKey = process.env.GEMINI_API_KEY;
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
