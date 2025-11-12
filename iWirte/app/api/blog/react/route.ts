import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  const { blogId, type, action, previousReaction } = await request.json();

  if (!blogId || !type) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    // Get current blog data
    const { data: blog } = await supabase
      .from('blogs')
      .select('likes, loves, dislikes')
      .eq('id', blogId)
      .single();

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const field = type === 'like' ? 'likes' : type === 'love' ? 'loves' : 'dislikes';
    let updates: any = {};

    if (action === 'remove') {
      // Remove reaction - decrease count
      updates[field] = Math.max(0, (blog[field] || 0) - 1);
    } else if (action === 'change' && previousReaction) {
      // Change reaction - decrease old, increase new
      const previousField = previousReaction === 'like' ? 'likes' : 
                           previousReaction === 'love' ? 'loves' : 'dislikes';
      
      updates[previousField] = Math.max(0, (blog[previousField] || 0) - 1);
      updates[field] = (blog[field] || 0) + 1;
    } else {
      // Add new reaction - increase count
      updates[field] = (blog[field] || 0) + 1;
    }

    // Update the database
    const { error } = await supabase
      .from('blogs')
      .update(updates)
      .eq('id', blogId);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
