/**
 * Flag card component with error handling and accessibility
 * Displays a country flag with loading states and error fallbacks
 */

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Country } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { getFlagImagePath, getFallbackFlagPath } from '@/lib/utils/flagVerification';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface FlagCardProps {
  country: Country;
  onClick?: () => void;
  disabled?: boolean;
  isCorrect?: boolean | null; // null = unselected, true = correct, false = wrong
  showResult?: boolean; // reveal state
  priority?: boolean; // For LCP optimization
}

export const FlagCard: React.FC<FlagCardProps> = ({
  country,
  onClick,
  disabled = false,
  isCorrect = null,
  showResult = false,
  priority = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imagePath, setImagePath] = useState(getFlagImagePath(country.code));

  // Reset states when country changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setImagePath(getFlagImagePath(country.code));
  }, [country.code]);

  // Dynamic classes based on state
  const statusClasses = cn(
    showResult && isCorrect === true && "ring-4 ring-success-500 scale-[1.02] shadow-glow-success",
    showResult && isCorrect === false && "ring-4 ring-error-500 opacity-50 grayscale",
    !disabled && !showResult && "hover:scale-[1.03] hover:shadow-2xl cursor-pointer focus-ring"
  );

  const handleImageError = () => {
    setHasError(true);
    setIsLoading(false);
    // Try fallback
    const fallbackPath = getFallbackFlagPath();
    if (fallbackPath !== imagePath) {
      setImagePath(fallbackPath);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  return (
    <Card
      onClick={!disabled ? onClick : undefined}
      className={cn(
        "relative aspect-[3/2] flex items-center justify-center p-0 overflow-hidden",
        "transition-all duration-300 transform",
        statusClasses
      )}
      hoverEffect={!disabled && !showResult}
      role={!disabled ? "button" : undefined}
      tabIndex={!disabled ? 0 : undefined}
      aria-label={`Flag of ${country.name}. ${showResult && isCorrect !== null ? (isCorrect ? 'Correct answer' : 'Incorrect answer') : 'Click to select'}`}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Background Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-surface-200 animate-pulse" aria-hidden="true" />
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-200 p-4" role="alert">
          <AlertCircle className="w-8 h-8 text-error-500 mb-2" aria-hidden="true" />
          <span className="text-xs text-foreground/60 text-center">{country.name}</span>
        </div>
      )}

      {/* Flag Image */}
      {!hasError && (
        <Image
          src={imagePath}
          alt={`Flag of ${country.name}`}
          fill
          className={cn(
            "object-contain p-2 sm:p-3 md:p-4 transition-opacity duration-500",
            isLoading ? 'opacity-0' : 'opacity-100'
          )}
          onLoad={handleImageLoad}
          onError={handleImageError}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          quality={90}
          loading={priority ? undefined : 'lazy'}
        />
      )}

      {/* Result Overlay Icons */}
      {showResult && isCorrect !== null && (
        <div className="absolute top-2 right-2 z-10" aria-hidden="true">
          {isCorrect ? (
            <div className="w-8 h-8 rounded-full bg-success-500 flex items-center justify-center text-white shadow-lg">
              ✓
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-error-500 flex items-center justify-center text-white shadow-lg">
              ✕
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
