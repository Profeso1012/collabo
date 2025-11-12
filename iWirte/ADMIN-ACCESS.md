# Admin Dashboard Access Guide

## Accessing the Admin Panel

The admin dashboard is where you manage all blog content. It's accessible at:

```
http://localhost:3000/admin
```

Or in production:

```
https://yourdomain.com/admin
```

## Features Available

### Dashboard (`/admin`)
- View all blog posts
- See engagement metrics (likes, loves)
- Quick access to edit or delete posts
- Create new blog posts

### Rich Text Editor (`/admin/editor`)
- Google Docs-like editing experience
- Full formatting toolbar:
  - Headers (H1-H6)
  - Bold, Italic, Underline, Strikethrough
  - Text colors and background colors
  - Ordered and unordered lists
  - Text alignment
  - Blockquotes and code blocks
  - Links and images
  - Clean formatting button

### Creating a New Post

1. Click "Create New Post" from the dashboard
2. Fill in the required fields:
   - **Title**: Your blog post title (auto-generates slug)
   - **Slug**: URL-friendly version (e.g., "my-first-post")
   - **Excerpt**: Brief summary (shows in blog listing)
   - **Featured Image**: Optional image URL
   - **Content**: Your full blog post with rich formatting

3. Choose to:
   - **Save Draft**: Saves without publishing
   - **Publish**: Makes it live and notifies subscribers

### Editing an Existing Post

1. From the dashboard, click "Edit" next to any post
2. Make your changes
3. Click "Save Draft" or "Publish"

### Deleting a Post

1. From the dashboard, click "Delete" next to any post
2. Confirm the deletion
3. Post and all associated comments are removed

## Important Security Notes

### Current Setup (Development)
- **No authentication required** - Anyone with the URL can access
- This is fine for local development
- **DO NOT deploy to production without authentication**

### Production Setup (Required)

You MUST add authentication before deploying. Here's how:

#### Option 1: NextAuth.js (Recommended)

```bash
npm install next-auth
```

Create `app/api/auth/[...nextauth]/route.ts`:

```typescript
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add your authentication logic here
        if (credentials?.username === "admin" && credentials?.password === "your-secure-password") {
          return { id: "1", name: "Admin", email: "admin@iwrite.com" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
});

export { handler as GET, handler as POST };
```

Create middleware to protect routes:

```typescript
// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token
  },
});

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
};
```

#### Option 2: Supabase Auth

Use Supabase's built-in authentication:

```bash
npm install @supabase/auth-helpers-nextjs
```

Follow Supabase auth documentation to set up.

#### Option 3: Custom Authentication

Create your own authentication system with:
- Password hashing (bcrypt)
- Session management
- Protected routes

## Best Practices

### Content Management

1. **Always preview before publishing**
   - Check formatting in the editor
   - Verify images load correctly
   - Test links

2. **Use descriptive slugs**
   - Keep them short and readable
   - Use hyphens, not underscores
   - Avoid special characters

3. **Write compelling excerpts**
   - 1-2 sentences max
   - Entice readers to click
   - Include key points

4. **Optimize images**
   - Use appropriate sizes (800x400 for featured images)
   - Compress before uploading
   - Use descriptive alt text

### SEO Tips

1. **Title**: 50-60 characters
2. **Excerpt**: 150-160 characters
3. **Content**: Use headers (H2, H3) for structure
4. **Images**: Include alt text
5. **Links**: Use descriptive anchor text

### Publishing Workflow

1. **Draft**: Write and format your post
2. **Review**: Check for typos and formatting
3. **Preview**: View how it looks (visit `/blog/[slug]`)
4. **Publish**: Click publish to go live
5. **Notify**: Subscribers automatically get emails

## Subscriber Management

Subscribers are stored in the Supabase `subscribers` table. To view:

1. Go to your Supabase dashboard
2. Navigate to Table Editor
3. Select `subscribers` table
4. View all email addresses

To export subscribers:
```sql
SELECT email FROM subscribers ORDER BY subscribed_at DESC;
```

## Troubleshooting

### Can't access admin dashboard
- Check URL is correct (`/admin`)
- Clear browser cache
- Check browser console for errors

### Rich text editor not loading
- Ensure JavaScript is enabled
- Check internet connection (loads external libraries)
- Try different browser

### Images not showing
- Verify image URLs are valid
- Check image is publicly accessible
- Use HTTPS URLs

### Publish button not working
- Check all required fields are filled
- Look for error messages
- Check browser console

### Subscribers not receiving emails
- Verify Resend API key is correct
- Check Resend dashboard for delivery status
- Ensure email addresses are valid
- Check spam folders

## API Endpoints

The admin panel uses these API routes:

- `GET /api/admin/blogs` - List all blogs
- `POST /api/admin/blogs` - Create new blog
- `PUT /api/admin/blogs` - Update blog
- `GET /api/admin/blogs/[id]` - Get single blog
- `DELETE /api/admin/blogs/[id]` - Delete blog
- `POST /api/admin/notify-subscribers` - Send newsletter

All these routes should be protected with authentication in production.

## Backup Strategy

### Regular Backups

1. **Database**: Supabase provides automatic backups
2. **Manual Export**: 
   ```sql
   -- Export all blogs
   SELECT * FROM blogs;
   ```
3. **Version Control**: Keep code in Git

### Recovery

If you need to restore:
1. Access Supabase dashboard
2. Go to Database > Backups
3. Select backup point
4. Restore

## Performance Tips

1. **Limit image sizes** - Large images slow down loading
2. **Use excerpts** - Don't load full content on listing pages
3. **Pagination** - Add pagination for many posts
4. **Caching** - Enable Next.js caching (already configured)

## Support

For admin-related issues:
- Check the browser console for errors
- Review Supabase logs
- Check API route responses
- Verify environment variables

Remember: **Always add authentication before deploying to production!**
