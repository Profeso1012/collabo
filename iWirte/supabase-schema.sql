-- Create blogs table
CREATE TABLE blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  featured_image TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  likes INTEGER DEFAULT 0,
  loves INTEGER DEFAULT 0,
  dislikes INTEGER DEFAULT 0
);

-- Create comments table
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  author_name TEXT DEFAULT 'Anonymous',
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscribers table
CREATE TABLE subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_published_at ON blogs(published_at DESC);
CREATE INDEX idx_comments_blog_id ON comments(blog_id);
CREATE INDEX idx_subscribers_email ON subscribers(email);

-- Enable Row Level Security (RLS)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to published blogs" ON blogs
  FOR SELECT USING (published_at IS NOT NULL);

CREATE POLICY "Allow public read access to comments" ON comments
  FOR SELECT USING (true);

-- Create policies for anonymous comment posting
CREATE POLICY "Allow anonymous comment posting" ON comments
  FOR INSERT WITH CHECK (true);

-- Create policies for subscriber management
CREATE POLICY "Allow public to subscribe" ON subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public to read subscribers" ON subscribers
  FOR SELECT USING (true);

-- ADMIN POLICIES - Allow all operations for service role
CREATE POLICY "Allow service role full access to blogs" ON blogs
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow service role full access to comments" ON comments
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow service role full access to subscribers" ON subscribers
  FOR ALL USING (true) WITH CHECK (true);
