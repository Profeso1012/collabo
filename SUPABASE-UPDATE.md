# Supabase Policy Update

## Important: Run This SQL in Supabase

To fix the RLS (Row Level Security) error, you need to add admin policies to your Supabase database.

### Steps:

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy and paste the SQL below
5. Click "Run" (or press F5)

### SQL to Run:

```sql
-- ADMIN POLICIES - Allow all operations for service role
CREATE POLICY "Allow service role full access to blogs" ON blogs
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow service role full access to comments" ON comments
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow service role full access to subscribers" ON subscribers
  FOR ALL USING (true) WITH CHECK (true);
```

### What This Does:

These policies allow the service role key (used by the admin API) to bypass RLS restrictions and perform all operations (create, read, update, delete) on all tables.

### Verification:

After running the SQL:
1. Restart your dev server (Ctrl+C, then `npm run dev`)
2. Go to `http://localhost:3000/admin/login`
3. Enter password: `iwriteadmin`
4. Try creating a blog post

It should work now!

---

**Note**: The full schema with all policies is in `supabase-schema.sql` if you need to recreate the entire database.
