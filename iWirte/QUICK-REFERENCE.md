# Quick Reference Guide

## Common Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Important URLs

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Landing page |
| Services | `/services` | Service offerings |
| Blog | `/blog` | Blog listing |
| Blog Post | `/blog/[slug]` | Individual post |
| Contact | `/contact` | Contact form |
| Careers | `/careers` | Writer applications |
| Admin Dashboard | `/admin` | Manage blogs |
| Editor | `/admin/editor` | Create/edit posts |

## Environment Variables

```env
# Required for Supabase
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Required for emails
RESEND_API_KEY=your_resend_key

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Database Tables

### blogs
- `id` - UUID primary key
- `title` - Post title
- `slug` - URL slug
- `content` - HTML content
- `excerpt` - Short description
- `featured_image` - Image URL
- `published_at` - Publish timestamp
- `likes`, `loves`, `dislikes` - Reaction counts

### comments
- `id` - UUID primary key
- `blog_id` - Foreign key to blogs
- `content` - Comment text
- `created_at` - Timestamp

### subscribers
- `id` - UUID primary key
- `email` - Email address
- `subscribed_at` - Timestamp

## API Endpoints

### Public APIs
```
GET  /api/blog/comments?blogId=xxx  # Get comments
POST /api/blog/comments             # Add comment
POST /api/blog/react                # Add reaction
POST /api/subscribe                 # Subscribe to newsletter
```

### Admin APIs (Protect in Production!)
```
GET    /api/admin/blogs           # List all blogs
POST   /api/admin/blogs           # Create blog
PUT    /api/admin/blogs           # Update blog
GET    /api/admin/blogs/[id]      # Get single blog
DELETE /api/admin/blogs/[id]      # Delete blog
POST   /api/admin/notify-subscribers  # Send newsletter
```

## Color Codes

```css
--maroon: #800020        /* Primary brand */
--light-blue: #ADD8E6    /* Secondary */
--off-white: #FAF9F6     /* Background */
--gold-yellow: #FFD700   /* Accent */
```

## Common Tasks

### Create a Blog Post
1. Navigate to `/admin`
2. Click "Create New Post"
3. Fill in title, excerpt, content
4. Add featured image URL (optional)
5. Click "Publish" or "Save Draft"

### Edit a Blog Post
1. Go to `/admin`
2. Click "Edit" next to the post
3. Make changes
4. Click "Publish" or "Save Draft"

### Delete a Blog Post
1. Go to `/admin`
2. Click "Delete" next to the post
3. Confirm deletion

### View Subscribers
1. Open Supabase dashboard
2. Go to Table Editor
3. Select `subscribers` table

### Export Subscribers
```sql
SELECT email FROM subscribers 
ORDER BY subscribed_at DESC;
```

## Customization Quick Tips

### Change Hero Text
File: `app/page.tsx`
```tsx
<h1>Your New Headline</h1>
<p>Your new tagline</p>
```

### Update Services
File: `app/services/page.tsx`
```tsx
const services = [
  {
    id: 'new-service',
    title: 'New Service',
    description: '...',
    features: ['...'],
    image: 'https://...',
  },
];
```

### Change Colors
File: `tailwind.config.ts`
```typescript
colors: {
  maroon: {
    DEFAULT: '#YOUR_COLOR',
  },
}
```

### Update Logo
File: `components/Navbar.tsx`
```tsx
<div className="w-10 h-10">
  <Image src="/logo.png" alt="Logo" />
</div>
```

### Modify Footer
File: `components/Footer.tsx`

## Troubleshooting

### Issue: Can't run npm commands
**Solution**: Set PowerShell execution policy
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Issue: Supabase connection error
**Solution**: Check `.env.local` credentials

### Issue: Rich text editor not loading
**Solution**: Clear cache, check console errors

### Issue: Images not displaying
**Solution**: Verify URLs, check `next.config.mjs` domains

### Issue: Newsletter not sending
**Solution**: Check Resend API key, verify domain

## File Locations

| What | Where |
|------|-------|
| Pages | `app/*/page.tsx` |
| Components | `components/*.tsx` |
| API Routes | `app/api/*/route.ts` |
| Styles | `app/globals.css` |
| Config | `*.config.*` files |
| Database Schema | `supabase-schema.sql` |

## Deployment Checklist

- [ ] Update `.env.local` with production values
- [ ] Add authentication to `/admin`
- [ ] Run `npm run build` successfully
- [ ] Test all pages
- [ ] Test all forms
- [ ] Verify Supabase connection
- [ ] Verify Resend emails work
- [ ] Set up custom domain
- [ ] Add SSL certificate
- [ ] Test on mobile devices
- [ ] Set up monitoring

## Security Notes

⚠️ **CRITICAL**: The `/admin` routes have NO authentication by default!

Before deploying to production:
1. Install NextAuth.js or similar
2. Add login page
3. Protect `/admin` routes
4. Protect `/api/admin` routes
5. Test authentication flow

## Performance Tips

- Use Next.js Image component for all images
- Enable caching (already configured)
- Optimize images before uploading
- Use lazy loading for heavy components
- Monitor Core Web Vitals

## Getting Help

1. Check browser console for errors
2. Review Supabase logs
3. Check API responses in Network tab
4. Verify environment variables
5. Read error messages carefully

## Useful SQL Queries

```sql
-- Count total blogs
SELECT COUNT(*) FROM blogs;

-- Get most liked posts
SELECT title, likes FROM blogs 
ORDER BY likes DESC LIMIT 10;

-- Count subscribers
SELECT COUNT(*) FROM subscribers;

-- Recent comments
SELECT * FROM comments 
ORDER BY created_at DESC LIMIT 20;

-- Delete all drafts
DELETE FROM blogs WHERE published_at IS NULL;
```

## Quick Fixes

### Reset database
```sql
TRUNCATE blogs, comments, subscribers CASCADE;
```

### Clear all reactions
```sql
UPDATE blogs SET likes = 0, loves = 0, dislikes = 0;
```

### Find broken image links
```sql
SELECT id, title, featured_image FROM blogs 
WHERE featured_image IS NOT NULL;
```

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Quill](https://github.com/zenoamaro/react-quill)

---

**Need more help?** Check the full documentation in README.md, SETUP-GUIDE.md, and ADMIN-ACCESS.md
