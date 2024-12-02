type RedditPost = {
  kind: string;
  title: string;
  subreddit: string;
  author: string;
  created_utc: number;
  permalink: string;
  url: string;
  ups: number;
  downs: number;
  num_comments: number;
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

type RedditTimePeriod = "hour" | "day" | "week" | "month" | "year" | "all";

type RedditSort = "hot" | "new" | "top" | "rising" | "controversial";

type Subreddit = {
  displayName: string; // e.g. technology
  displayNamePrefixed: string; // e.g. r/technology
  description: string;
  subscribers: number;
  url: string;
  over18: boolean;
  lang: string;
};

type FetchRedditPostOptions = {
  subreddit: string;
  sorting?: RedditSort;
  timePeriod?: RedditTimePeriod;
  limit?: number;
};

export const fetchRedditPosts = async ({
  subreddit,
  sorting = "rising",
  timePeriod = "week",
  limit = 10,
}: FetchRedditPostOptions): Promise<RedditPost[]> => {
  const url = new URL(`https://www.reddit.com/r/${subreddit}/${sorting}.json`);
  url.searchParams.append("limit", limit + ""); // Limit to 100 posts
  if (sorting === "top" || sorting === "controversial")
    url.searchParams.append("t", timePeriod); // All time

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const json: RedditPostResponse = await response.json();
    const posts: RedditPost[] = json.data.children.map((child) => ({
      kind: child.kind,
      title: child.data.title,
      subreddit: child.data.subreddit,
      author: child.data.author,
      created_utc: child.data.created_utc,
      permalink: child.data.permalink,
      url: child.data.url,
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
