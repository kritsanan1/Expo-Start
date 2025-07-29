
import { createClient } from '@supabase/supabase-js';

// These will be set up through environment variables
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types for TypeScript
export interface User {
  id: string;
  email: string;
  name: string;
  age: number;
  bio: string;
  location: string;
  interests: string[];
  video_url?: string;
  profile_photo_url?: string;
  social_connections: {
    facebook?: boolean;
    tiktok?: boolean;
    instagram?: boolean;
    twitter?: boolean;
  };
  premium: boolean;
  created_at: string;
  updated_at: string;
}

export interface Match {
  id: string;
  user1_id: string;
  user2_id: string;
  status: 'pending' | 'matched' | 'rejected';
  created_at: string;
}

export interface Message {
  id: string;
  match_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'video' | 'image';
  created_at: string;
  read_at?: string;
}

export interface VideoProfile {
  id: string;
  user_id: string;
  video_url: string;
  thumbnail_url?: string;
  duration: number;
  created_at: string;
}
