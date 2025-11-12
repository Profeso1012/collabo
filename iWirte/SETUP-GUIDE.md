# iWrite Website Setup Guide

## Quick Start

Since you're on Windows with PowerShell execution policy restrictions, follow these steps:

### 1. Install Dependencies

Open PowerShell as Administrator and run:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then in your project directory:

```powershell
npm install
```

### 2. Configure Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once created, go to Project Settings > API
3. Copy your project URL and anon key
4. Update `.env.local` with your actual credentials

### 3. Set Up Database

1. In your Supabase project, go to the SQL Editor
2. Copy the entire contents of `supabase-schema.sql`
3. Paste and run it in the SQL Editor
4. This creates all necessary tables and security policies

### 4. Configure Resend (Email Service)

1. Go to [resend.com](https://resend.com) and sign up
2. Get your API key from the dashboard
3. Add it to `.env.local` as `RESEND_API_KEY`
4. For production, verify your domain in Resend

### 5. Run the Development Server

```powershell
npm run dev
```

Visit `http://localhost:3000` to see your website!

## Admin Dashboard Access

Navigate to `http://localhost:3000/admin` to:
- Create new blog posts
- Edit existing posts
- Delete posts
- View engagement metrics

**Important**: In production, add authentication to protect this route!

## Testing the Blog Features

### Create Your First Blog Post

1. Go to `http://localhost:3000/admin`
2. Click "Create New Post"
3. Fill in:
   - Title: "Welcome to iWrite"
   - Excerpt: "Our first blog post"
   - Content: Use the rich text editor to format your content
   - Featured Image: `https://picsum.photos/800/400?random=1`
4. Click "Publish"

### Test Reactions

1. Visit the blog post you just created
2. Try clicking like, love, or dislike
3. The counters should update immediately

### Test Comments

1. Scroll to the comments section
2. Write a comment (no login required)
3. Submit and see it appear

### Test Newsletter

1. Go to `/blog`
2. Enter an email in the newsletter form
3. Check your Supabase `subscribers` table to confirm

## Customization Tips

### Change Brand Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  maroon: {
    DEFAULT: '#YOUR_COLOR',
    // ...
  },
}
```

### Update Hero Text

Edit `app/page.tsx` and find the hero section:

```tsx
<h1>Your New Headline</h1>
<p>Your new tagline</p>
```

### Add More Services

Edit `app/services/page.tsx` and add to the `services` array.

### Change Logo

Replace the logo in `components/Navbar.tsx`:

```tsx
<div className="w-10 h-10 bg-maroon rounded-lg">
  {/* Add your logo image here */}
</div>
```

## Deployment to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your production URL)
5. Deploy!

## Adding Authentication (Recommended for Production)

To protect the admin dashboard:

1. Install NextAuth.js:
```bash
npm install next-auth
```

2. Create `app/api/auth/[...nextauth]/route.ts`
3. Add authentication middleware to `/admin` routes
4. Create login page at `/admin/login`

## Troubleshooting

### "Cannot find module" errors
```bash
npm install
```

### Supabase connection issues
- Check your `.env.local` file
- Verify credentials in Supabase dashboard
- Ensure database tables are created

### Rich text editor not loading
- Clear browser cache
- Check browser console for errors
- Ensure `react-quill` is installed

### Images not displaying
- Check image URLs are valid
- Verify Next.js image domains in `next.config.mjs`
- Use absolute URLs for external images

## Production Checklist

- [ ] Add authentication to admin routes
- [ ] Set up custom domain
- [ ] Configure Resend with verified domain
- [ ] Add Google Analytics
- [ ] Set up error monitoring (Sentry)
- [ ] Optimize images
- [ ] Add sitemap.xml
- [ ] Add robots.txt
- [ ] Test on mobile devices
- [ ] Set up backup strategy for database
- [ ] Add rate limiting to API routes
- [ ] Configure CORS properly
- [ ] Add CSP headers
- [ ] Test all forms
- [ ] Set up monitoring/uptime checks

## Support

For technical issues with the codebase, check:
- Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)
- Supabase docs: [supabase.com/docs](https://supabase.com/docs)
- Tailwind CSS: [tailwindcss.com/docs](https://tailwindcss.com/docs)

## Next Steps

1. Customize the content to match your brand
2. Add real images (replace Picsum placeholders)
3. Write your first blog post
4. Set up authentication
5. Deploy to production
6. Share with the world!

Good luck with iWrite! 🚀
