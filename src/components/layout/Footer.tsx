/**
 * Footer component
 * Site footer with links and copyright
 * Optimized for all device sizes
 */

"use client";

import React from 'react';
import { Github, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Footer() {
    return (
        <footer className="w-full py-6 sm:py-8 mt-auto border-t border-white/5 bg-surface-50/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-foreground/60">
                <p className="font-mono text-center sm:text-left">
                    &copy; {new Date().getFullYear()} FLAG<span className="text-brand-500">MASTER</span>. All rights reserved.
                </p>

                <div className="flex items-center gap-4 sm:gap-6">
                    <a 
                        href="#" 
                        className="hover:text-brand-400 transition-colors flex items-center gap-1.5 sm:gap-2"
                        aria-label="View source code"
                    >
                        <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Source</span>
                    </a>
                    <div className="w-px h-4 bg-white/10" />
                    <a 
                        href="#" 
                        className="hover:text-accent-400 transition-colors flex items-center gap-1.5 sm:gap-2"
                        aria-label="View portfolio"
                    >
                        <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Portfolio</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
