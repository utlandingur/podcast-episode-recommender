// we may not actually need most of these types. especially if it reduces cost with the generative AI model
export type RedditPost = {
  title: string;
  subreddit: string;
  created_utc: number;
  permalink?: string;
  url: URL;
  ups: number;
  downs: number;
  num_comments: number;
};

export type RedditTimePeriod =
  | "hour"
  | "day"
  | "week"
  | "month"
  | "year"
  | "all";

export type RedditSort = "hot" | "new" | "top" | "rising" | "controversial";

export type Subreddit = {
  displayName: string; // e.g. technology
  displayNamePrefixed: string; // e.g. r/technology
  description: string;
  subscribers: number;
  url: string;
  over18: boolean;
  lang: string;
};

export type RedditPostResponse = {
  kind: string;
  data: {
    children: {
      kind: string;
      data: Omit<RedditPost, "url">;
    }[];
  };
};

export type SubredditSearchResponse = {
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
