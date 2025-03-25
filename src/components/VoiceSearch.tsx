
import React, { useState, useRef, useEffect } from 'react';
import { Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/sonner';

interface VoiceSearchProps {
  onVoiceData: (audioBlob: Blob) => void;
  className?: string;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({ onVoiceData, className }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Start recording
  const startRecording = async () => {
    audioChunksRef.current = [];
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        onVoiceData(audioBlob);
        setIsListening(true);
        setTimeout(() => setIsListening(false), 2500);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      // Automatically stop recording after 8 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
          stopRecording();
        }
      }, 8000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Could not access microphone. Please check your permissions.');
    }
  };
  
  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };
  
  // Toggle recording state
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={toggleRecording}
        className={cn(
          "relative flex items-center justify-center p-3 rounded-full transition-all duration-300 transform",
          "border border-white/20 backdrop-blur-md",
          isRecording ? 
            "bg-red-500/80 text-white hover:bg-red-600/80 animate-pulse" : 
            "glass hover:shadow-md bg-assamese-light/10 text-assamese-light hover:bg-assamese-light/20",
          "focus:outline-none focus:ring-2 focus:ring-assamese focus:ring-opacity-50"
        )}
        aria-label={isRecording ? 'Stop voice recording' : 'Start voice recording'}
      >
        <Mic className="w-5 h-5" />
        
        {/* Voice animation waves */}
        {isRecording && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-end space-x-0.5">
            <div className="voice-wave bg-assamese-light animate-wave-1"></div>
            <div className="voice-wave bg-assamese-light animate-wave-2"></div>
            <div className="voice-wave bg-assamese-light animate-wave-3"></div>
            <div className="voice-wave bg-assamese-light animate-wave-2"></div>
            <div className="voice-wave bg-assamese-light animate-wave-1"></div>
          </div>
        )}
        
        {/* Processing indicator */}
        {isListening && !isRecording && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs text-assamese animate-pulse">
            Processing...
          </div>
        )}
      </button>
    </div>
  );
};

export default VoiceSearch;
