
export interface SearchResult {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  sourceUrl?: string;
  date?: string;
  category?: string;
  tags?: string[];
}

export type SearchType = 'text' | 'voice' | 'image';

export interface SearchResponse {
  results: SearchResult[];
  totalResults: number;
  searchTime?: number;
  query: string;
  searchType: SearchType;
}

export interface ApiErrorResponse {
  error: string;
  code: string;
  details?: string;
}
