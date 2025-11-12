import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const blogId = searchParams.get('blogId');

  if (!blogId) {
    return NextResponse.json({ error: 'Blog ID required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('blog_id', blogId)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const { blogId, content, authorName, parentId } = await request.json();

  if (!blogId || !content) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data, error} = await supabase
    .from('comments')
    .insert([{ 
      blog_id: blogId, 
      content,
      author_name: authorName || 'Anonymous',
      parent_id: parentId || null
    }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
