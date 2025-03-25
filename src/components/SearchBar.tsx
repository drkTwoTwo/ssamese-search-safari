
import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialQuery?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search Assamese Culture...',
  initialQuery = '',
  className
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Focus the input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn(
        "relative w-full max-w-2xl transition-all duration-300",
        className
      )}
    >
      <div 
        className={cn(
          "glass relative flex items-center rounded-full px-4 py-2 transition-all duration-300 shadow-md",
          "hover:shadow-lg border border-white/20 bg-white/10 backdrop-blur-md",
          isFocused ? "ring-2 ring-assamese-light ring-opacity-50 shadow-lg scale-[1.02]" : ""
        )}
      >
        <Search 
          className={cn(
            "w-5 h-5 mr-2 text-assamese transition-colors duration-300",
            isFocused ? "text-assamese-light" : "text-assamese/70"
          )} 
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none py-2 px-1 text-foreground placeholder:text-foreground/50"
          aria-label="Search Assamese culture"
        />
      </div>
    </form>
  );
};

export default SearchBar;
