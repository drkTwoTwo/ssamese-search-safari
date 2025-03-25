
import React, { useState, useRef } from 'react';
import { Image, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/sonner';

interface ImageSearchProps {
  onImageSelect: (file: File) => void;
  className?: string;
}

const ImageSearch: React.FC<ImageSearchProps> = ({ onImageSelect, className }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Process the selected file
  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast.error('Please select an image file (JPEG, PNG, WebP, etc.)');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size exceeds 5MB limit. Please choose a smaller image.');
      return;
    }

    // Create preview and pass file to parent
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
    
    onImageSelect(file);
  };

  // Clear the selected image
  const clearImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={className}>
      {!preview ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative flex flex-col items-center justify-center p-3 rounded-full cursor-pointer transition-all duration-300",
            "glass border border-white/20 backdrop-blur-md",
            "hover:shadow-md bg-assamese-light/10 text-assamese-light hover:bg-assamese-light/20",
            isDragging && "ring-2 ring-assamese-light ring-opacity-50 bg-assamese-light/20",
            "focus:outline-none focus:ring-2 focus:ring-assamese focus:ring-opacity-50"
          )}
          aria-label="Upload an image to search"
        >
          <Image className="w-5 h-5" />
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            aria-hidden="true"
          />
        </div>
      ) : (
        <div className="relative">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-assamese-light">
            <img 
              src={preview} 
              alt="Selected search image"
              className="w-full h-full object-cover"
            />
            <button
              onClick={clearImage}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5 transform translate-x-1/4 -translate-y-1/4"
              aria-label="Remove selected image"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSearch;
