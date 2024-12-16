import { fetchBlueskyData } from "./fetchBlueskyData";
import { fetchMastadonData } from "./fetchMastadonData";
import { fetchTrendingRedditData } from "./fetchRedditData";

export const fetchTrendingData = async (keywords: string[]) => {
  // limit the number of keywords from 1 to 4
  if (!keywords.length) return {};
  if (keywords.length > 4) keywords = keywords.slice(0, 3);
  const recentMastadonSearchData = await fetchMastadonData(keywords);
  const trendingRedditData = await fetchTrendingRedditData(keywords);
  const topBlueSkyData = await fetchBlueskyData(keywords);

  return { trendingRedditData, recentMastadonSearchData, topBlueSkyData };
};
