// we may not actually need most of these types. especially if it reduces cost with the generative AI model
export type RedditPost = {
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