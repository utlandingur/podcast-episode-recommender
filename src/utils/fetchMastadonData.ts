import type {
  MastadonSearchData,
  MastadonSearchResponse,
  MastadonSearchResult,
} from "@/types/mastadon";

export const fetchMastadonData = async (
  keywords: string[]
): Promise<MastadonSearchData[]> => {
  try {
    const results = await Promise.allSettled(
      keywords.map(async (keyword) => {
        const searchResults = await searchMastadon(keyword);
        return { query: keyword, searchResults };
      })
    );
    const mastadonSearchData = results
      .filter(
        (result): result is PromiseFulfilledResult<MastadonSearchData> =>
          result.status === "fulfilled"
      )
      .map((result) => result.value);

    return mastadonSearchData;
  } catch (error) {
    console.error("Failed to fetch Mastadon data:", error);
    return [];
  }
};

// Only possible to return recent statuses
const searchMastadon = async (
  query: string
): Promise<MastadonSearchResult[]> => {
  const url = new URL("https://mastodon.social/api/v2/search");
  url.searchParams.append("q", query);
  url.searchParams.append("limit", "40"); // 40 is the max limit
  url.searchParams.append("type", "statuses");

  try {
    const response = await fetch(url);
    console.log("response", response, "for url", url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const json: MastadonSearchResponse = await response.json();
    const searchResults = json.statuses.map((status) => {
      const searchResult: MastadonSearchResult = {
        createdAt: status.created_at,
        language: status.language,
        content: status.content,
        repliesCount: status.replies_count,
        reblogsCount: status.reblogs_count,
        favouritesCount: status.favourites_count,
        card: {
          title: status.card.title,
          description: status.card.description,
        },
        url: status.url,
      };
      return searchResult;
    });
    return searchResults;
  } catch {
    console.error("Failed to fetch Mastadon data for query:", query);
    return [];
  }
};
