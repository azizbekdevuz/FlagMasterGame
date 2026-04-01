/**
 * Sound effects hook
 * Manages sound playback with enable/disable toggle
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import { STORAGE_KEYS } from '@/lib/config/constants';

interface SoundConfig {
  volume?: number;
  playbackRate?: number;
}

/**
 * Custom hook for playing sound effects
 * @returns Object with playSound function and soundEnabled state
 */
export function useSound() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    // Initialize audio context
    if (typeof window !== 'undefined') {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioContext(context);

      // Load preference from localStorage
      const stored = localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED);
      if (stored !== null) {
        setSoundEnabled(stored === 'true');
      }
    }
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const newValue = !prev;
      localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, String(newValue));
      return newValue;
    });
  }, []);

  const playSound = useCallback(
    async (soundPath: string, config: SoundConfig = {}) => {
      if (!soundEnabled || !audioContext) return;

      try {
        const response = await fetch(soundPath);
        
        // Check if file exists (404 means file not found)
        if (!response.ok) {
          // Silently fail if file doesn't exist - game works without sounds
          return;
        }

        const arrayBuffer = await response.arrayBuffer();
        
        // Check if we got actual audio data
        if (arrayBuffer.byteLength === 0) {
          return;
        }

        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const source = audioContext.createBufferSource();
        const gainNode = audioContext.createGain();

        source.buffer = audioBuffer;
        source.playbackRate.value = config.playbackRate || 1.0;
        gainNode.gain.value = config.volume || 0.5;

        source.connect(gainNode);
        gainNode.connect(audioContext.destination);

        source.start(0);
      } catch (error) {
        // Silently fail if sound can't be played
        // This allows the game to work even without sound files
        if (process.env.NODE_ENV === 'development') {
          console.debug('Sound file not available:', soundPath);
        }
      }
    },
    [soundEnabled, audioContext]
  );

  return {
    soundEnabled,
    toggleSound,
    playSound,
  };
}

