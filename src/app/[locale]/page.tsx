/**
 * Home page component
 * Landing page with game mode selection
 * Optimized for all device sizes
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Timer, Zap, Trophy, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

export default function Home() {
  const { t } = useTranslation();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center px-4 py-8 sm:py-12 md:py-16 lg:py-20">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-[10%] sm:left-[20%] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-brand-500/10 rounded-full blur-[80px] sm:blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[10%] sm:right-[20%] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-accent-500/10 rounded-full blur-[80px] sm:blur-[100px] animate-pulse-slow" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="z-10 w-full max-w-7xl mx-auto text-center space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16"
      >
        {/* Header */}
        <motion.div variants={item} className="space-y-3 sm:space-y-4 md:space-y-6 px-2 sm:px-4 w-full">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-surface-glass border border-white/10 mb-2 sm:mb-4">
            <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-mono text-brand-300">{t('hero.system_online')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] sm:leading-[0.95] px-2 sm:px-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-brand-200 to-brand-500 drop-shadow-[0_0_30px_rgba(14,165,233,0.3)]">
              {t('hero.title_prefix')}
            </span>
            <br />
            <span className="text-accent-400 drop-shadow-[0_0_20px_rgba(232,121,249,0.3)]">
              {t('hero.title_suffix')}
            </span>
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/60 max-w-3xl mx-auto font-light px-4 sm:px-6 md:px-8 leading-relaxed break-normal">
            {t('hero.subtitle')}
          </p>
        </motion.div>

        {/* Game Modes */}
        <motion.div 
          variants={item} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 px-2 sm:px-4 md:px-6"
        >
          <Link href="/game/classic" className="focus-ring rounded-xl h-full">
            <Card hoverEffect glow className="h-full flex flex-col items-center text-center p-6 sm:p-7 md:p-8 group min-h-[280px] sm:min-h-[300px] md:min-h-[320px]">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-2xl bg-brand-500/20 flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7 sm:w-8 sm:h-8 text-brand-400" aria-hidden="true" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{t('modes.classic.title')}</h3>
              <p className="text-foreground/60 text-xs sm:text-sm mb-4 sm:mb-6 flex-grow">{t('modes.classic.desc')}</p>
              <Button
                variant="outline"
                size="md"
                className="w-full mt-auto group-hover:bg-brand-500 group-hover:border-brand-500 group-hover:text-white transition-all text-xs sm:text-sm"
              >
                {t('modes.classic.action')} <Play className="w-3 h-3 sm:w-4 sm:h-4 ml-2" aria-hidden="true" />
              </Button>
            </Card>
          </Link>

          <Link href="/game/time-attack" className="focus-ring rounded-xl h-full">
            <Card hoverEffect glow className="h-full flex flex-col items-center text-center p-6 sm:p-7 md:p-8 group relative overflow-hidden min-h-[280px] sm:min-h-[300px] md:min-h-[320px]">
              <div className="absolute inset-0 bg-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-2xl bg-accent-500/20 flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform relative z-10">
                <Timer className="w-7 h-7 sm:w-8 sm:h-8 text-accent-400" aria-hidden="true" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 relative z-10">{t('modes.time_attack.title')}</h3>
              <p className="text-foreground/60 text-xs sm:text-sm mb-4 sm:mb-6 flex-grow relative z-10">{t('modes.time_attack.desc')}</p>
              <Button 
                variant="neon" 
                size="md"
                className="w-full mt-auto relative z-10 text-xs sm:text-sm"
              >
                {t('modes.time_attack.action')} <Zap className="w-3 h-3 sm:w-4 sm:h-4 ml-2" aria-hidden="true" />
              </Button>
            </Card>
          </Link>

          <Link href="/game/hardcore" className="focus-ring rounded-xl h-full sm:col-span-2 lg:col-span-1">
            <Card hoverEffect glow className="h-full flex flex-col items-center text-center p-6 sm:p-7 md:p-8 group min-h-[280px] sm:min-h-[300px] md:min-h-[320px]">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-2xl bg-error-500/20 flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-error-400" aria-hidden="true" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{t('modes.hardcore.title')}</h3>
              <p className="text-foreground/60 text-xs sm:text-sm mb-4 sm:mb-6 flex-grow">{t('modes.hardcore.desc')}</p>
              <Button
                variant="outline"
                size="md"
                className="w-full mt-auto group-hover:bg-error-500 group-hover:border-error-500 group-hover:text-white transition-all text-xs sm:text-sm"
              >
                {t('modes.hardcore.action')} <Play className="w-3 h-3 sm:w-4 sm:h-4 ml-2" aria-hidden="true" />
              </Button>
            </Card>
          </Link>
        </motion.div>

        {/* Footer Stats / CTA */}
        <motion.div 
          variants={item} 
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm text-foreground/60 font-mono px-4"
        >
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-brand-500 mr-2" aria-hidden="true" />
            Build v2.0.0
          </div>
          <div className="flex items-center">
            Questions? <span className="text-brand-400 ml-1 hover:underline cursor-pointer">Ask AI</span>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
