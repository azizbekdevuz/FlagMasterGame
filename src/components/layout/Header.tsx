/**
 * Header component
 * Fixed navigation header with logo and controls
 * Optimized for all device sizes
 */

"use client";

import React from 'react';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

export default function Header() {
    const { t } = useTranslation();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-6 py-3 sm:py-4">
            <div className="max-w-7xl mx-auto">
                <div className="glass-panel rounded-full px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-4">
                    {/* Logo */}
                    <Link 
                        href="/" 
                        className="font-black tracking-tighter text-base sm:text-lg md:text-xl flex items-center gap-1.5 sm:gap-2 group flex-shrink-0"
                        aria-label="FlagMaster Home"
                    >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform text-xs sm:text-sm font-bold">
                            FM
                        </div>
                        <span className="hidden sm:block bg-clip-text text-transparent bg-gradient-to-r from-brand-200 to-white">
                            FLAG<span className="font-light text-brand-400">MASTER</span>
                        </span>
                    </Link>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
                        <LanguageSwitcher />
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}
