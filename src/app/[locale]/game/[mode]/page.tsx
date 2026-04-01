/**
 * Game page component
 * Main game interface with all features integrated
 * Optimized for all device sizes
 */

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { useStatisticsStore } from '@/store/statisticsStore';
import { GameMode, Country } from '@/lib/types';
import { FlagCard } from '@/components/game/FlagCard';
import { ScoreBoard } from '@/components/game/ScoreBoard';
import { HintButton } from '@/components/game/HintButton';
import { SoundToggle } from '@/components/game/SoundToggle';
import { Button } from '@/components/ui/Button';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { Loader2, Trophy, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import confetti from 'canvas-confetti';
import { useSound } from '@/lib/hooks/useSound';
import { SOUND_CONFIG } from '@/lib/config/constants';
import { getAchievementsByIds } from '@/lib/config/achievements';
import { AchievementIcon } from '@/components/ui/AchievementIcon';
import { Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const { t } = useTranslation();
  const mode = params.mode as GameMode;

  const {
    startGame,
    status,
    targetCountry,
    options,
    submitAnswer,
    currentQuestionIndex,
    endGame,
    timeLeft,
    score,
    streak,
    hintsUsed,
    difficulty,
  } = useGameStore();

  const { statistics } = useStatisticsStore();
  const { playSound } = useSound();

  const [selectedAnswer, setSelectedAnswer] = useState<Country | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hintRemovedOption, setHintRemovedOption] = useState<string | null>(null);
  const [newAchievements, setNewAchievements] = useState<string[]>([]);

  // Initialize game
  useEffect(() => {
    if (mode && ['classic', 'time-attack', 'hardcore'].includes(mode)) {
      startGame(mode);
    } else {
      router.push('/');
    }
  }, [mode, startGame, router]);

  // Timer Interval
  useEffect(() => {
    if (mode === 'time-attack' && status === 'playing') {
      const timer = setInterval(() => {
        useGameStore.getState().tickTimer();
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [mode, status]);

  // Check for new achievements
  useEffect(() => {
    if (status === 'finished') {
      const currentAchievements = statistics.achievements;
      if (currentAchievements.length > 0) {
        setNewAchievements(currentAchievements);
      }
    }
  }, [status, statistics.achievements]);

  // Handle hint usage
  const handleHintUsed = useCallback((removedOption: string) => {
    setHintRemovedOption(removedOption);
    playSound(SOUND_CONFIG.HINT);
    
    setTimeout(() => {
      setHintRemovedOption(null);
    }, 3000);
  }, [playSound]);

  // Handle Answer
  const handleAnswer = useCallback((country: Country) => {
    if (isTransitioning || status !== 'playing') return;

    setSelectedAnswer(country);
    const correct = submitAnswer(country);
    setIsTransitioning(true);

    if (correct) {
      playSound(SOUND_CONFIG.CORRECT);
      
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#0ea5e9', '#e879f9'],
      });
    } else {
      playSound(SOUND_CONFIG.INCORRECT);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setIsTransitioning(false);
      useGameStore.getState().nextQuestion();
    }, 1500);
  }, [isTransitioning, status, submitAnswer, playSound]);

  // Filter options based on hint
  const displayOptions = hintRemovedOption
    ? options.filter((opt) => opt.code !== hintRemovedOption)
    : options;

  // Loading state
  if (status === 'idle') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Loader2 className="w-10 h-10 animate-spin text-brand-500" aria-label="Loading game" />
      </div>
    );
  }

  // Game over state
  if (status === 'finished') {
    const unlockedAchievements = getAchievementsByIds(newAchievements);

    return (
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col items-center justify-center space-y-6 sm:space-y-8 md:space-y-10 bg-background p-4 sm:p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4 sm:space-y-6 max-w-2xl w-full"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              {t('game.game_over')}
            </h1>
            
            <div className="space-y-3 sm:space-y-4">
              <p className="text-xl sm:text-2xl md:text-3xl">
                {t('game.score')}: <span className="text-brand-400 font-bold">{score}</span>
              </p>
              
              {streak > 0 && (
                <p className="text-lg sm:text-xl text-accent-400">
                  Best Streak: {streak}
                </p>
              )}

              {unlockedAchievements.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 sm:mt-8 space-y-4"
                >
                  <h3 className="text-lg sm:text-xl font-bold flex items-center justify-center gap-2">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-warning-500" />
                    New Achievements Unlocked!
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    {unlockedAchievements.map((achievement) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="glass-card p-3 sm:p-4 text-center"
                      >
                        <div className="flex justify-center mb-2">
                          <AchievementIcon achievement={achievement} size={24} className="sm:w-8 sm:h-8" />
                        </div>
                        <div className="text-xs sm:text-sm font-bold">{achievement.name}</div>
                        <div className="text-[10px] sm:text-xs text-foreground/60 mt-1">
                          {achievement.description}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-6">
              <Button
                onClick={() => {
                  useGameStore.getState().resetGame();
                  startGame(mode);
                }}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {t('game.play_again')}
              </Button>
              <Button
                onClick={() => router.push('/')}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                {t('game.main_menu')}
              </Button>
            </div>
          </motion.div>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background flex flex-col items-center p-3 sm:p-4 md:p-6 pt-16 sm:pt-20 md:pt-24">
        {/* Header Info */}
        <div className="w-full max-w-6xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/')}
            className="focus-ring self-start sm:self-auto text-xs sm:text-sm"
            aria-label={t('hero.warp_home')}
          >
            ← {t('hero.warp_home')}
          </Button>
          
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2 sm:gap-3">
              <HintButton onHintUsed={handleHintUsed} />
              <SoundToggle />
            </div>
            <ScoreBoard />
          </div>
          
          <div className="font-mono text-lg sm:text-xl md:text-2xl font-bold min-w-[50px] sm:min-w-[60px] text-right self-end sm:self-auto">
            {timeLeft !== undefined ? (
              <span className={cn(
                timeLeft < 10 && 'text-error-500 animate-pulse'
              )}>
                {timeLeft}s
              </span>
            ) : (
              <span className="text-foreground/60 text-sm sm:text-base md:text-lg">
                Q-{currentQuestionIndex}
              </span>
            )}
          </div>
        </div>

        {/* Difficulty Indicator */}
        {difficulty !== 'easy' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 sm:mb-4"
          >
            <span className="text-xs font-mono px-2.5 sm:px-3 py-1 rounded-full bg-accent-500/20 text-accent-400 border border-accent-500/30">
              {difficulty.toUpperCase()}
            </span>
          </motion.div>
        )}

        {/* Question Area */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 space-y-2 sm:space-y-3 md:space-y-4 w-full max-w-4xl px-4">
          <motion.h2
            key={targetCountry?.code}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight px-2"
          >
            {targetCountry?.name}
          </motion.h2>
          <p className="text-sm sm:text-base text-foreground/60">{t('game.select_prompt')}</p>
        </div>

        {/* Cards Grid */}
        <div className={cn(
          "grid w-full max-w-5xl gap-4 sm:gap-5 md:gap-6 lg:gap-8 px-2 sm:px-4",
          displayOptions.length === 1 
            ? 'grid-cols-1 max-w-md' 
            : displayOptions.length === 2 
            ? 'grid-cols-1 sm:grid-cols-2' 
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        )}>
          <AnimatePresence mode="wait">
            {displayOptions.map((country, index) => {
              const isRemoved = hintRemovedOption === country.code;
              
              return (
                <motion.div
                  key={`${currentQuestionIndex}-${country.code}`}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ 
                    opacity: isRemoved ? 0 : 1,
                    scale: isRemoved ? 0.8 : 1,
                    y: isRemoved ? -20 : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <FlagCard
                    country={country}
                    onClick={() => handleAnswer(country)}
                    disabled={isTransitioning || isRemoved}
                    showResult={isTransitioning}
                    isCorrect={
                      isTransitioning
                        ? country.code === targetCountry?.code
                        : null
                    }
                    priority={index === 0}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Hint Removed Indicator */}
        {hintRemovedOption && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 sm:mt-6 text-center flex items-center justify-center gap-2"
          >
            <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-warning-400" aria-hidden="true" />
            <p className="text-xs sm:text-sm text-warning-400 font-mono">
              One incorrect option removed!
            </p>
          </motion.div>
        )}
      </div>
    </ErrorBoundary>
  );
}
