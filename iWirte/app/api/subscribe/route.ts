import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = formData.get('email') as string;

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 });
  }

  const { error } = await supabase
    .from('subscribers')
    .insert([{ email }]);

  if (error) {
    if (error.code === '23505') {
      return NextResponse.redirect(new URL('/blog?subscribed=already', request.url));
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.redirect(new URL('/blog?subscribed=true', request.url));
}
