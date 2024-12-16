import {
  RedditSort,
  RedditTimePeriod,
  RedditPost,
  Subreddit,
} from "@/types/reddit";

type FetchRedditPostOptions = {
  subredditDisplayName: string;
  sorting?: RedditSort;
  timePeriod?: RedditTimePeriod;
  limit?: number;
};

type RedditPostResponse = {
  kind: string;
  data: {
    children: {
      kind: string;
      data: Omit<RedditPost, "kind">;
    }[];
  };
};

type SubredditSearchResponse = {
  kind: string;
  data: {
    children: {
      data: {
        display_name: string;
        display_name_prefixed: string;
        public_description: string;
        subscribers: number;
        over18: boolean;
        lang: string;
      };
    }[];
  };
};

export const fetchRedditPosts = async ({
  subredditDisplayName,
  sorting = "rising",
  timePeriod = "week",
  limit = 10,
}: FetchRedditPostOptions): Promise<RedditPost[]> => {
  const url = new URL(
    `https://www.reddit.com/r/${subredditDisplayName}/${sorting}.json`
  );
  url.searchParams.append("limit", limit + "");
  if (sorting === "top" || sorting === "controversial")
    url.searchParams.append("t", timePeriod);

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const json: RedditPostResponse = await response.json();
    const posts: RedditPost[] = json.data.children.map((child) => ({
      title: child.data.title,
      subreddit: child.data.subreddit,
      created_utc: child.data.created_utc,
      permalink: child.data.permalink,
      ups: child.data.ups,
      downs: child.data.downs,
      num_comments: child.data.num_comments,
    }));
    return posts;
  } catch (error) {
    console.error("Failed to fetch Reddit posts:", error);
    return [];
  }
};

type FetchSubRedditOptions = {
  keyword: string;
  limit?: number;
};

export const fetchSubreddits = async ({
  keyword,
  limit = 3,
}: FetchSubRedditOptions): Promise<Subreddit[]> => {
  const url = new URL(`https://www.reddit.com/subreddits/search.json`);
  url.searchParams.append("q", keyword);
  url.searchParams.append("limit", limit + "");

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const json: SubredditSearchResponse = await response.json();
    const subreddits = json.data.children
      .map((child) => ({
        displayName: child.data.display_name,
        displayNamePrefixed: child.data.display_name_prefixed,
        description: child.data.public_description,
        subscribers: child.data.subscribers,
        url: `https://www.reddit.com/r/${child.data.display_name}`,
        over18: child.data.over18,
        lang: child.data.lang,
      }))
      .sort((a, b) => b.subscribers - a.subscribers); // Sort by subscribers in descending order;
    return subreddits;
  } catch (error) {
    console.error(
      `Failed to fetch subreddits for keyword:${keyword}. Error is`,
      error
    );
    return [];
  }
};

export const fetchTrendingRedditData = async (
  keywords: string[]
): Promise<RedditPost[]> => {
  // limit the number of keywords from 1 to 4
  if (!keywords.length) return [];
  if (keywords.length > 4) keywords = keywords.slice(0, 3);
  try {
    const subredditResults = await Promise.allSettled(
      keywords.map((keyword) => fetchSubreddits({ keyword }))
    );

    const subreddits = subredditResults
      .filter(
        (result): result is PromiseFulfilledResult<Subreddit[]> =>
          result.status === "fulfilled"
      )
      .map((result) => result.value)
      .flat();

    const postsResults = await Promise.allSettled(
      await subreddits.map((subreddit) =>
        fetchRedditPosts({ subredditDisplayName: subreddit.displayName })
      )
    );

    const posts = postsResults
      .filter(
        (result): result is PromiseFulfilledResult<RedditPost[]> =>
          result.status === "fulfilled"
      )
      .map((result) => result.value)
      .flat();

    return posts;
  } catch (error) {
    console.error("Failed to fetch trending Reddit data:", error);
    return [];
  }
};
