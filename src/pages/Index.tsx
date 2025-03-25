
import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import VoiceSearch from '@/components/VoiceSearch';
import ImageSearch from '@/components/ImageSearch';
import SearchResults from '@/components/SearchResults';
import { textSearch, voiceSearch, imageSearch } from '@/services/api';
import { SearchResponse } from '@/types';
import { toast } from 'sonner';
import CultureGallery from '@/components/CultureGallery';

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
    <div className="min-h-screen flex flex-col items-center bg-assamese-earth-brown bg-cover bg-fixed bg-center relative">
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-assamese-earth-dark/70 backdrop-blur-sm z-0"></div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header with logo and title */}
        <header className="w-full py-6 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center mb-2">
            <div className="w-16 h-16 rounded-full bg-assamese-tea-dark flex items-center justify-center text-white font-bold text-3xl shadow-lg">
              A
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-1 text-white drop-shadow-lg">
            Assamese Cultural Search
          </h1>
          <p className="text-lg text-assamese-tea-accent text-center max-w-lg mx-auto mb-8 drop-shadow">
            Discover the rich cultural heritage, traditions, and art of Assam
          </p>
        </header>

        {/* Search Container */}
        <div 
          className={cn(
            "w-full max-w-4xl mx-auto px-6 transition-all duration-500 ease-out",
            hasSearched ? "pt-6 pb-0" : "pt-10 pb-16",
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

        {/* Culture Gallery - only show when not searched */}
        {!hasSearched && <CultureGallery />}

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
    </div>
  );
};

// Helper function for class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default Index;
