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
