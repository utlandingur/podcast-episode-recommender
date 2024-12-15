export type Podcast = {
  id: number;
  title: string;
  feedUrl: string;
  description: string;
  image: string;
  language: string;
  type: number; // 0:RSS, 1:Atom
  dead: boolean; // Once the feed is marked dead, checked once per month.
  episodeCount: number;
  newestItemPubdate: number;
  trackCount: string;
};

enum TranscriptType {
  ApplicationJson = "application/json",
  ApplicationSrt = "application/srt",
  TextHtml = "text/html",
  TextPlain = "text/plain",
  TextSrt = "text/srt",
  TextVtt = "text/vtt",
}

export type PodcastEpisodeResponse = {
  title: string;
  description: string;
  datePublished: string;
  episode: number;
  feedLanguage: string;
  transcriptUrl: URL | null;
  transcripts: { url: URL; type: TranscriptType }[];
};

export type PodcastEpisode = {
  collectionName: string;
  description: string;
  datePublished: string; // TODO - convert to date
  episodeNumber: number;
  language: string;
  transcriptUrl: URL | null;
  transcripts: { url: URL; type: TranscriptType }[];
};

export type PodcastEpisodeForAI = Omit<
  PodcastEpisode,
  "collectionName" | "episodeNumber" | "transcriptUrl" | "language"
>;
