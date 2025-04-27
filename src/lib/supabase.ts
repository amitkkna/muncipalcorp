import { createClient } from '@supabase/supabase-js';

// These would typically come from environment variables
// For a POC, we're hardcoding them here, but in production, use .env files
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvYyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjE2MTQwMDAwLCJleHAiOjE5MzE3MTYwMDB9.dummy-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
