import { BlueSkySearchData } from "@/types/bluesky";
import { searchBluesky } from "@/serverActions/searchBluesky";

export const fetchBlueskyData = async (
  keywords: string[]
): Promise<BlueSkySearchData[]> => {
  try {
    const results = await Promise.allSettled(
      keywords.map(async (keyword) => {
        const searchResults = await searchBluesky(keyword);
        return { query: keyword, searchResults };
      })
    );
    const blueskySearchData = results
      .filter(
        (result): result is PromiseFulfilledResult<BlueSkySearchData> =>
          result.status === "fulfilled"
      )
      .map((result) => result.value);

    return blueskySearchData;
  } catch (error) {
    console.error("Failed to fetch Bluesky data:", error);
    return [];
  }
};

export const generatePostLink = (handle: string, uri: string): URL => {
  const postId = uri.split("/").pop(); // Extract the last part of the URI
  return new URL(`https://bsky.app/profile/${handle}/post/${postId}`);
};
