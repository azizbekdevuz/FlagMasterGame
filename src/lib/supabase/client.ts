import { createClient } from '@supabase/supabase-js';
import { Database } from '../types'; // Requires mapped types, but for now we use generic or need to generate types

// Default to empty strings to prevent build errors during initial setup phases
// User will follow the guide to set these.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
