
import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import VoiceSearch from '@/components/VoiceSearch';
import ImageSearch from '@/components/ImageSearch';
import SearchResults from '@/components/SearchResults';
import { textSearch, voiceSearch, imageSearch } from '@/services/api';
import { SearchResponse } from '@/types';
import { toast } from '@/components/ui/sonner';

const Index = () => {
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Text search handler
  const handleTextSearch = async (query: string) => {
    try {
      setIsSearching(true);
      const results = await textSearch(query);
      setSearchResults(results);
      setHasSearched(true);
    } catch (error) {
      console.error('Text search error:', error);
      toast.error('Search failed. Please try again later.');
    } finally {
      setIsSearching(false);
    }
  };

  // Voice search handler
  const handleVoiceSearch = async (audioBlob: Blob) => {
    try {
      setIsSearching(true);
      const results = await voiceSearch(audioBlob);
      setSearchResults(results);
      setHasSearched(true);
      toast.success('Voice search processed successfully');
    } catch (error) {
      console.error('Voice search error:', error);
      toast.error('Voice search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Image search handler
  const handleImageSearch = async (imageFile: File) => {
    try {
      setIsSearching(true);
      const results = await imageSearch(imageFile);
      setSearchResults(results);
      setHasSearched(true);
      toast.success('Image search processed successfully');
    } catch (error) {
      console.error('Image search error:', error);
      toast.error('Image search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-white to-assamese-lightest/30">
      {/* Header with logo and title */}
      <header className="w-full py-6 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center mb-2">
          <div className="w-12 h-12 rounded-full bg-assamese-light flex items-center justify-center text-white font-bold text-2xl">
            A
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-1 text-assamese-darkest">
          Assamese Cultural Search
        </h1>
        <p className="text-muted-foreground text-center max-w-md mx-auto mb-8">
          Discover the rich cultural heritage, traditions, and art of Assam
        </p>
      </header>

      {/* Search Container */}
      <div 
        className={cn(
          "w-full max-w-4xl mx-auto px-6 transition-all duration-500 ease-out",
          hasSearched ? "pt-6 pb-0" : "pt-16 pb-32",
        )}
      >
        <div className="relative flex flex-col items-center">
          {/* Main Search Bar */}
          <SearchBar 
            onSearch={handleTextSearch} 
            className="z-10 mb-6" 
          />
          
          {/* Search Options */}
          <div className="flex space-x-4 items-center mb-8">
            <VoiceSearch 
              onVoiceData={handleVoiceSearch} 
            />
            <ImageSearch 
              onImageSelect={handleImageSearch}
            />
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className={cn(
        "w-full max-w-4xl mx-auto px-6 transition-all duration-500", 
        hasSearched ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}>
        <SearchResults 
          searchResponse={searchResults}
          loading={isSearching}
        />
      </div>
    </div>
  );
};

// Helper function for class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default Index;
