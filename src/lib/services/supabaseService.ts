/**
 * Supabase service layer
 * Handles all database operations for leaderboard, statistics, and achievements
 */

import { supabase } from '@/lib/supabase/client';
import { GameMode } from '@/lib/types';
import { GameStatistics } from '@/lib/types/statistics';

export interface LeaderboardEntry {
  id: string;
  user_id: string | null;
  username: string;
  score: number;
  mode: GameMode;
  created_at: string;
}

/**
 * Submit score to leaderboard
 */
export async function submitScore(
  username: string,
  score: number,
  mode: GameMode
): Promise<LeaderboardEntry | null> {
  try {
    const { data, error } = await supabase
      .from('leaderboard')
      .insert({
        username,
        score,
        mode,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error submitting score:', error);
    return null;
  }
}

/**
 * Get leaderboard entries
 */
export async function getLeaderboard(
  mode?: GameMode,
  limit: number = 10
): Promise<LeaderboardEntry[]> {
  try {
    let query = supabase
      .from('leaderboard')
      .select('*')
      .order('score', { ascending: false })
      .limit(limit);

    if (mode) {
      query = query.eq('mode', mode);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
}

/**
 * Sync statistics to Supabase (if user is authenticated)
 */
export async function syncStatistics(
  userId: string,
  statistics: GameStatistics
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        updated_at: new Date().toISOString(),
      });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error syncing statistics:', error);
    return false;
  }
}

/**
 * Check if Supabase is configured
 */
export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== '' &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== ''
  );
}

