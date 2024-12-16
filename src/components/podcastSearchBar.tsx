"use client";
import { lookupPodcasts } from "@/utils/lookupPodcasts";
import { useRouter } from "next/navigation";
import { SearchBar } from "@/components/searchBar";
import { usePageLoad } from "@/providers/pageLoadProvider";
import type { SearchResult } from "@/components/searchBar";

export const PodcastSearchBar = () => {
  const router = useRouter();
  const { startLoading } = usePageLoad();

  const podcastSearch = async (searchTerm: string): Promise<SearchResult[]> => {
    if (!searchTerm) return [];
    const podcasts = await lookupPodcasts(searchTerm, 6);
    return podcasts.map((podcast) => ({
      name: podcast.title,
      label: podcast.title,
      image: podcast.image,
      handleOnClick: () => {
        startLoading();
        router.push(`/podcasts/${JSON.stringify(podcast.id)}`);
      },
    }));
  };

  return <SearchBar searchQuery={podcastSearch} />;
};
