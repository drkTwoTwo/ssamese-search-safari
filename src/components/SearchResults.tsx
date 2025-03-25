
import React, { useState } from 'react';
import { SearchResponse, SearchResult } from '../types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SearchResultsProps {
  searchResponse: SearchResponse | null;
  loading: boolean;
  className?: string;
}

// Lazy loaded image component
const LazyImage: React.FC<{src: string, alt: string}> = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <div className="relative aspect-video bg-black/10 rounded-lg overflow-hidden">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn(
          "search-result-image w-full h-full object-cover",
          loaded ? "loaded" : "loading"
        )}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

const SearchResults: React.FC<SearchResultsProps> = ({ 
  searchResponse, 
  loading,
  className
}) => {
  if (loading) {
    return (
      <div className={cn("w-full max-w-4xl mx-auto animate-fade-in py-8", className)}>
        <div className="flex flex-col space-y-6">
          {Array(3).fill(null).map((_, index) => (
            <div key={index} className="flex flex-col space-y-2 enhanced-glass p-6 rounded-xl animate-pulse">
              <div className="h-6 bg-white/20 rounded w-3/4"></div>
              <div className="h-4 bg-white/20 rounded w-1/2"></div>
              <div className="h-20 bg-white/20 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!searchResponse || searchResponse.results.length === 0) {
    return null;
  }

  const { results, totalResults, searchTime, query, searchType } = searchResponse;

  return (
    <div className={cn("w-full max-w-4xl mx-auto animate-fade-in py-8 mb-10", className)}>
      <div className="mb-6 p-4 enhanced-glass rounded-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">
            <span>{totalResults} results</span>
            <span className="text-sm text-white/70 ml-2">
              ({searchTime ? `${searchTime.toFixed(2)} seconds` : 'Search'} for "{query}")
            </span>
          </h2>
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
            {searchType === 'text' ? 'Text Search' : 
             searchType === 'voice' ? 'Voice Search' : 'Image Search'}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {results.map((result: SearchResult, index) => (
          <motion.div 
            key={result.id} 
            className="enhanced-glass p-6 rounded-xl transition-all duration-300 hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex flex-col space-y-4">
              {/* Result Header */}
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {result.title}
                </h3>
                {result.sourceUrl && (
                  <a 
                    href={result.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-assamese-lightest hover:underline line-clamp-1"
                  >
                    {result.sourceUrl}
                  </a>
                )}
              </div>
              
              {/* Image (if available) */}
              {result.imageUrl && (
                <LazyImage src={result.imageUrl} alt={result.title} />
              )}
              
              {/* Description */}
              <p className="text-white/90 leading-relaxed">
                {result.description}
              </p>
              
              {/* Footer Info */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-sm text-white/70">
                {result.date && (
                  <span>{result.date}</span>
                )}
                
                {result.category && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
                    {result.category}
                  </span>
                )}
                
                {result.tags && result.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {result.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white/90"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
