import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendNewsletter } from '@/lib/resend';

export async function POST(request: NextRequest) {
  const { blogTitle, blogSlug } = await request.json();

  if (!blogTitle || !blogSlug) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data: subscribers, error } = await supabase
    .from('subscribers')
    .select('email');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const blogUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${blogSlug}`;

  const promises = subscribers.map((subscriber) =>
    sendNewsletter(subscriber.email, blogTitle, blogUrl)
  );

  await Promise.allSettled(promises);

  return NextResponse.json({ success: true, notified: subscribers.length });
}
