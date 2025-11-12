# iWrite Website

A modern, full-featured website for iWrite - a professional writing services brand with an integrated personal blog platform.

## Features

### Public Website
- **Home Page**: Hero section with iframes, service overview, and call-to-actions
- **Services Page**: Detailed information about all writing services (thesis, projects, copywriting, synopsis, fiction)
- **Contact Page**: Professional contact form for project inquiries
- **Careers Page**: Writer application form for future opportunities
- **Responsive Design**: Mobile, tablet, and desktop optimized

### Blog Platform
- **Public Blog**: Browse, search, and filter blog posts
- **Individual Post Pages**: Full blog post view with rich formatting
- **Reactions**: Like, love, and dislike functionality
- **Anonymous Comments**: Readers can comment without accounts
- **Newsletter Subscription**: Email notifications for new posts
- **Search & Filter**: Find posts by title and date

### Admin Dashboard
- **Rich Text Editor**: Google Docs-like editing experience with React Quill
- **Full Formatting**: Headers, bold, italic, underline, colors, lists, images, links
- **Draft & Publish**: Save drafts or publish immediately
- **Edit & Delete**: Manage existing blog posts
- **Auto-Notifications**: Subscribers get emails when new posts are published

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Rich Text Editor**: React Quill
- **Email**: Resend API
- **Images**: Picsum Photos (placeholder)
- **TypeScript**: Full type safety

## Color Theme

- **Maroon**: #800020 (Primary brand color)
- **Light Blue**: #ADD8E6 (Secondary color)
- **Off White**: #FAF9F6 (Background)
- **Gold Yellow**: #FFD700 (Accent)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Update `.env.local` with your actual credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Set Up Supabase Database

1. Create a new Supabase project
2. Run the SQL commands from `supabase-schema.sql` in the Supabase SQL editor
3. This will create all necessary tables, indexes, and security policies

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the website.

### 5. Access Admin Dashboard

Navigate to `http://localhost:3000/admin` to access the admin dashboard and rich text editor.

**Note**: In production, you should add authentication to protect the admin routes.

## Project Structure

```
├── app/
│   ├── page.tsx                 # Home page
│   ├── services/page.tsx        # Services page
│   ├── blog/
│   │   ├── page.tsx            # Blog listing
│   │   └── [slug]/page.tsx     # Individual blog post
│   ├── contact/page.tsx         # Contact form
│   ├── careers/page.tsx         # Careers/writer application
│   ├── admin/
│   │   ├── page.tsx            # Admin dashboard
│   │   └── editor/[[...id]]/page.tsx  # Rich text editor
│   └── api/
│       ├── blog/               # Blog API routes
│       ├── admin/              # Admin API routes
│       └── subscribe/          # Newsletter subscription
├── components/
│   ├── Navbar.tsx              # Navigation bar
│   ├── Footer.tsx              # Footer
│   ├── BlogSearch.tsx          # Blog search component
│   ├── BlogReactions.tsx       # Like/love/dislike buttons
│   └── BlogComments.tsx        # Comments section
├── lib/
│   ├── supabase.ts             # Supabase client
│   └── resend.ts               # Email service
└── public/                     # Static assets
```

## Key Features Implementation

### Rich Text Editor
- Uses React Quill for WYSIWYG editing
- Supports all standard formatting options
- Image embedding via URLs
- Clean HTML output for blog posts

### Blog Reactions
- Three reaction types: like, love, dislike
- Real-time counter updates
- Stored in Supabase database

### Anonymous Comments
- No authentication required
- Stored with timestamps
- Displayed chronologically

### Newsletter System
- Email collection via Supabase
- Automatic notifications using Resend API
- Triggered on blog publish

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Sticky navigation that shrinks on scroll
- Hamburger menu for mobile

## Customization

### Changing Colors
Edit `tailwind.config.ts` to modify the color scheme.

### Adding Services
Update `app/services/page.tsx` to add or modify service offerings.

### Modifying Hero Content
Edit `app/page.tsx` to change hero text and CTAs.

## Production Deployment

### Recommended Platforms
- **Vercel**: Optimized for Next.js
- **Netlify**: Great for static sites
- **Railway**: Full-stack deployment

### Pre-Deployment Checklist
1. Add authentication to `/admin` routes
2. Update environment variables
3. Configure custom domain
4. Set up Resend email domain
5. Test all forms and API routes
6. Optimize images
7. Enable Supabase RLS policies

## Admin Access

The admin dashboard is accessible at `/admin`. In production, you should:

1. Add authentication (NextAuth.js recommended)
2. Create admin user accounts
3. Protect all `/admin` and `/api/admin` routes
4. Add role-based access control

## Support

For issues or questions about the iWrite brand and services, contact through the website contact form.

## License

Proprietary - iWrite Brand
