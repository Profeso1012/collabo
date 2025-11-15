import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only JPG, PNG, WebP, and GIF are allowed.' }, { status: 400 });
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Maximum size is 10MB.' }, { status: 400 });
    }

    // Create unique filename
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'png';
    const fileName = `${timestamp}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    // Convert file to buffer
    const buffer = await file.arrayBuffer();

    // Upload to Supabase storage
    const { data, error } = await supabaseAdmin.storage
      .from('pictures')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error('Supabase storage error:', error);
      return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }

    // Get public URL
    const { data: publicUrl } = supabaseAdmin.storage
      .from('blog-images')
      .getPublicUrl(data.path);

    return NextResponse.json({
      url: publicUrl.publicUrl,
      path: data.path,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
