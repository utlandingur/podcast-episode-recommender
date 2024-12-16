export type BlueskyPost = {
  createdAt: string;
  author: string;
  textContent: string;
  replyCount: number;
  likeCount: number;
  quoteCount: number;
  url: URL;
};

export type BlueskySearchResponse = {
  posts: {
    record: {
      createdAt: string;
      text: string;
    };
    author: {
      displayName: string;
      handle: string;
    };
    uri: string;
    replyCount: number;
    likeCount: number;
    quoteCount: number;
  }[];
};

export type BlueSkySearchData = {
  query: string;
  searchResults: BlueskyPost[];
};
