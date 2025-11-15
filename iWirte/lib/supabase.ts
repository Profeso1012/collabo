import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const createClient = () => {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = createClient();

export type Blog = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image?: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  likes: number;
  loves: number;
  dislikes: number;
};

export type Comment = {
  id: string;
  blog_id: string;
  content: string;
  created_at: string;
};

export type Subscriber = {
  id: string;
  email: string;
  subscribed_at: string;
};
