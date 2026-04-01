import { z } from 'zod';

export const CountrySchema = z.object({
  code: z.string().length(2),
  name: z.string(),
});

export type Country = z.infer<typeof CountrySchema>;

export const GameModeSchema = z.enum(['classic', 'time-attack', 'hardcore']);
export type GameMode = z.infer<typeof GameModeSchema>;

export const GameStateSchema = z.object({
  status: z.enum(['idle', 'playing', 'finished']),
  score: z.number().nonnegative(),
  mistakes: z.number().nonnegative(),
  currentQuestionIndex: z.number().nonnegative(),
  timeLeft: z.number().nonnegative().optional(), // For Time Attack
});
export type GameState = z.infer<typeof GameStateSchema>;

export const UserProfileSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(3).max(20),
  avatar_url: z.string().url().optional(),
  total_score: z.number().default(0),
  games_played: z.number().default(0),
  best_streak: z.number().default(0),
});
export type UserProfile = z.infer<typeof UserProfileSchema>;

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          avatar_url: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          username?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          username?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      leaderboard: {
        Row: {
          id: string
          user_id: string | null
          username: string
          score: number
          mode: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          username: string
          score: number
          mode: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          username?: string
          score?: number
          mode?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leaderboard_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
