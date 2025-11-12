# Update Comments Table for Nested Replies

Run this SQL in your Supabase SQL Editor to add nested comments support:

```sql
-- Add parent_id and author_name columns to comments table
ALTER TABLE comments 
ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS author_name TEXT DEFAULT 'Anonymous';

-- Create index for faster parent comment lookups
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_id);
```

This allows:
- Comments to have replies (parent_id links to parent comment)
- Users to add their name (or stay anonymous)
- Nested comment threads
