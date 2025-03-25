
import { SearchResponse, SearchType, ApiErrorResponse } from '../types';

// Helper function to handle API responses
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    try {
      const errorData = await response.json() as ApiErrorResponse;
      throw new Error(errorData.error || 'Unknown error occurred');
    } catch (e) {
      if (e instanceof Error) throw e;
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
  }
  
  return response.json() as Promise<T>;
};

// Mock response generator for development/fallback
const generateMockResponse = (query: string, searchType: SearchType): SearchResponse => {
  const mockResults = Array(5).fill(null).map((_, index) => ({
    id: `mock-${searchType}-${index}`,
    title: `Assamese ${searchType === 'image' ? 'Visual' : 'Cultural'} Result #${index + 1} for "${query}"`,
    description: `This is a sample result for your ${searchType} search about Assamese culture. This would contain relevant information about traditions, history, or artifacts related to your query.`,
    imageUrl: searchType === 'image' ? 'https://via.placeholder.com/300x200/205295/FFFFFF?text=Assamese+Culture' : undefined,
    sourceUrl: 'https://example.com/assamese-culture',
    date: new Date().toISOString().split('T')[0],
    category: ['Festival', 'Tradition', 'Cuisine', 'Art', 'History'][Math.floor(Math.random() * 5)],
    tags: ['Assam', 'Culture', 'Heritage', 'India', 'Northeast'][Math.floor(Math.random() * 5)].split(' ')
  }));
  
  return {
    results: mockResults,
    totalResults: mockResults.length,
    searchTime: 0.35,
    query,
    searchType
  };
};

// Text search
export const textSearch = async (query: string): Promise<SearchResponse> => {
  try {
    const response = await fetch(`/api/textSearch?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await handleResponse<SearchResponse>(response);
  } catch (error) {
    console.warn('Text search API error, using mock data:', error);
    return generateMockResponse(query, 'text');
  }
};

// Voice search (sends audio data and returns search results)
export const voiceSearch = async (audioBlob: Blob): Promise<SearchResponse> => {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    
    const response = await fetch('/api/voiceSearch', {
      method: 'POST',
      body: formData,
    });
    return await handleResponse<SearchResponse>(response);
  } catch (error) {
    console.warn('Voice search API error, using mock data:', error);
    return generateMockResponse("voice query example", 'voice');
  }
};

// Image search (sends image data and returns search results)
export const imageSearch = async (imageFile: File): Promise<SearchResponse> => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await fetch('/api/imageSearch', {
      method: 'POST',
      body: formData,
    });
    return await handleResponse<SearchResponse>(response);
  } catch (error) {
    console.warn('Image search API error, using mock data:', error);
    return generateMockResponse("image search example", 'image');
  }
};
