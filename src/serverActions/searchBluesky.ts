"use server";

import { BlueskyPost, BlueskySearchResponse } from "@/types/bluesky";
import { getDateAWeekAgo } from "@/utils/dates";
import { generatePostLink } from "@/utils/fetchBlueskyData";

export const searchBluesky = async (query: string): Promise<BlueskyPost[]> => {
  const url = new URL(
    "https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts"
  );
  url.searchParams.append("q", query);
  url.searchParams.append("limit", "50"); // 100 is the max limit
  url.searchParams.append("sort", "top");
  url.searchParams.append("since", getDateAWeekAgo().toISOString());

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const json: BlueskySearchResponse = await response.json();
    console.log("Bluesky json", json);

    const blueskyPosts = json.posts.map((post) => {
      console.log("post", post);
      const { record, author, replyCount, likeCount, quoteCount, uri } = post;
      const blueskyPost: BlueskyPost = {
        createdAt: record.createdAt,
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
  } catch (error) {
    console.error(
      "Failed to fetch Bluesky data for query:",
      query,
      "with error",
      error
    );
    return [];
  }
};
