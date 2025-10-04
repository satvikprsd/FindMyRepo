import React, { useState, useEffect } from 'react';
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/ui/prompt-input"
import { Button } from "@/components/ui/button"
import { ArrowUp, Square } from "lucide-react"

interface HeroPromptInputProps {
  value: string;
  onValueChange: (value: string) => void;
  onSubmit: () => void;
  placeholders: string[];
}

export function HeroPromptInput({ value, onValueChange, onSubmit, placeholders }: HeroPromptInputProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Rotate placeholders every 5 seconds with smooth transition
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setPlaceholderIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % placeholders.length;
          setCurrentPlaceholder(placeholders[nextIndex]);
          return nextIndex;
        });
        setIsTransitioning(false);
      }, 150); // Half of transition duration
    }, 5000);

    return () => clearInterval(interval);
  }, [placeholders]);

  const handleSubmit = () => {
    if (!value.trim()) return;
    setIsLoading(true);
    onSubmit();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleValueChange = (newValue: string) => {
    onValueChange(newValue);
  };

  return (
    <PromptInput
      value={value}
      onValueChange={handleValueChange}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      className="w-full bg-card/60 backdrop-blur-md border border-white/20 shadow-2xl hover:shadow-gray-500/20 transition-all duration-300 hover:border-white/30 focus-within:border-white/40"
    >
      <PromptInputTextarea 
        placeholder={currentPlaceholder}
        className={`text-foreground placeholder:text-muted-foreground/70 code-text text-base transition-opacity duration-300 cursor-text ${
          isTransitioning ? 'opacity-50' : 'opacity-100'
        }`}
      />
      <PromptInputActions className="justify-end pt-3">
        <PromptInputAction
          tooltip={isLoading ? "Stop generation" : "Search repositories"}
        >
          <Button
            variant="default"
            size="icon"
            className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/25 transition-all duration-300"
            onClick={handleSubmit}
          >
            {isLoading ? (
              <Square className="h-5 w-5 fill-current" />
            ) : (
              <ArrowUp className="h-5 w-5" />
            )}
          </Button>
        </PromptInputAction>
      </PromptInputActions>
    </PromptInput>
  );
}
