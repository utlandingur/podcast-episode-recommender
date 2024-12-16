export type MastadonSearchResponse = {
  statuses: {
    created_at: string;
    language: string;
    content: string;
    replies_count: number;
    reblogs_count: number;
    favourites_count: number;
    card: {
      title: string;
      description: string;
    };
    url: URL;
  }[];
};

export type MastadonSearchResult = {
  createdAt: string;
  language: string;
  content: string;
  repliesCount: number;
  reblogsCount: number;
  favouritesCount: number;
  card: {
    title: string;
    description: string;
  };
  url: URL;
};

export type MastadonSearchData = {
  query: string;
  searchResults: MastadonSearchResult[];
};
