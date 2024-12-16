import {
  BlueSkySearchData,
  BlueskyPost,
  BlueskySearchResponse,
} from "@/types/bluesky";
import { getDateAWeekAgo } from "./dates";

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

const searchBluesky = async (query: string): Promise<BlueskyPost[]> => {
  const url = new URL(
    "https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts"
  );
  url.searchParams.append("q", query);
  url.searchParams.append("limit", "20"); // 100 is the max limit
  url.searchParams.append("sort", "top");
  url.searchParams.append("since", getDateAWeekAgo().toDateString());

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const json: BlueskySearchResponse = await response.json();

    const blueskyPosts = json.posts.map((post) => {
      const { record, langs, author, replyCount, likeCount, quoteCount, uri } =
        post;
      const blueskyPost: BlueskyPost = {
        createdAt: record.createdAt,
        language: langs[0],
        author: author.displayName,
        textContent: record.text,
        replyCount,
        likeCount,
        quoteCount,
        url: generatePostLink(author.handle, uri),
      };
      return blueskyPost;
    });
    return blueskyPosts;
  } catch {
    console.error("Failed to fetch Bluesky data for query:", query);
    return [];
  }
};

const generatePostLink = (handle: string, uri: string): URL => {
  const postId = uri.split("/").pop(); // Extract the last part of the URI
  return new URL(`https://bsky.app/profile/${handle}/post/${postId}`);
};
