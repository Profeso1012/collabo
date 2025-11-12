# iWrite Website Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        USER BROWSER                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Home   │  │ Services │  │   Blog   │  │  Admin   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS APPLICATION                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              App Router (Pages)                       │  │
│  │  • / (Home)                                          │  │
│  │  • /services                                         │  │
│  │  • /blog                                             │  │
│  │  • /blog/[slug]                                      │  │
│  │  • /contact                                          │  │
│  │  • /careers                                          │  │
│  │  • /admin                                            │  │
│  │  • /admin/editor                                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                            │                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              API Routes                               │  │
│  │  • /api/blog/react                                   │  │
│  │  • /api/blog/comments                                │  │
│  │  • /api/subscribe                                    │  │
│  │  • /api/admin/blogs                                  │  │
│  │  • /api/admin/notify-subscribers                     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                ▼                       ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│      SUPABASE            │  │       RESEND             │
│  ┌──────────────────┐   │  │  ┌──────────────────┐   │
│  │  blogs table     │   │  │  │  Email Service   │   │
│  │  comments table  │   │  │  │  Newsletter      │   │
│  │  subscribers     │   │  │  │  Notifications   │   │
│  └──────────────────┘   │  │  └──────────────────┘   │
└──────────────────────────┘  └──────────────────────────┘
```

## Data Flow

### Blog Post Creation Flow

```
Admin Dashboard (/admin)
        │
        ▼
Rich Text Editor (/admin/editor)
        │
        │ User writes content
        │ Formats with toolbar
        │ Adds images
        │
        ▼
Click "Publish"
        │
        ▼
POST /api/admin/blogs
        │
        ├─► Insert into Supabase (blogs table)
        │
        └─► POST /api/admin/notify-subscribers
                │
                ├─► Fetch subscribers from Supabase
                │
                └─► Send emails via Resend API
                        │
                        ▼
                Subscribers receive email
```

### Blog Reading Flow

```
User visits /blog
        │
        ▼
Fetch blogs from Supabase
        │
        ▼
Display blog cards
        │
        ▼
User clicks blog post
        │
        ▼
Navigate to /blog/[slug]
        │
        ├─► Display blog content
        │
        ├─► Load reactions (likes, loves, dislikes)
        │
        └─► Load comments
                │
                ▼
        User can:
        • React (POST /api/blog/react)
        • Comment (POST /api/blog/comments)
```

### Newsletter Subscription Flow

```
User enters email in /blog
        │
        ▼
POST /api/subscribe
        │
        ▼
Insert into Supabase (subscribers table)
        │
        ▼
Redirect to /blog?subscribed=true
        │
        ▼
Show success message
```

## Component Hierarchy

```
RootLayout
├── Navbar
│   ├── Logo
│   ├── Navigation Links
│   └── Mobile Menu
│
├── Page Content
│   │
│   ├── Home Page
│   │   ├── Hero Section (with iframe)
│   │   ├── Services Overview
│   │   ├── Why Choose Us
│   │   └── CTA Section
│   │
│   ├── Services Page
│   │   └── Service Cards (x5)
│   │
│   ├── Blog Page
│   │   ├── BlogSearch
│   │   └── Blog Cards
│   │
│   ├── Blog Post Page
│   │   ├── Blog Content
│   │   ├── BlogReactions
│   │   └── BlogComments
│   │
│   ├── Contact Page
│   │   └── Contact Form
│   │
│   ├── Careers Page
│   │   └── Application Form
│   │
│   └── Admin Pages
│       ├── Dashboard
│       │   └── Blog List Table
│       │
│       └── Editor
│           ├── Title Input
│           ├── Slug Input
│           ├── Excerpt Textarea
│           ├── Featured Image Input
│           ├── ReactQuill Editor
│           └── Action Buttons
│
└── Footer
    ├── Brand Info
    ├── Service Links
    ├── Company Links
    └── Social Links
```

## Database Schema

```
┌─────────────────────────────────────────┐
│              blogs                       │
├─────────────────────────────────────────┤
│ id (UUID, PK)                           │
│ title (TEXT)                            │
│ slug (TEXT, UNIQUE)                     │
│ content (TEXT)                          │
│ excerpt (TEXT)                          │
│ featured_image (TEXT, nullable)         │
│ published_at (TIMESTAMP)                │
│ created_at (TIMESTAMP)                  │
│ updated_at (TIMESTAMP)                  │
│ likes (INTEGER)                         │
│ loves (INTEGER)                         │
│ dislikes (INTEGER)                      │
└─────────────────────────────────────────┘
                │
                │ 1:N
                ▼
┌─────────────────────────────────────────┐
│            comments                      │
├─────────────────────────────────────────┤
│ id (UUID, PK)                           │
│ blog_id (UUID, FK → blogs.id)          │
│ content (TEXT)                          │
│ created_at (TIMESTAMP)                  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│          subscribers                     │
├─────────────────────────────────────────┤
│ id (UUID, PK)                           │
│ email (TEXT, UNIQUE)                    │
│ subscribed_at (TIMESTAMP)               │
└─────────────────────────────────────────┘
```

## API Endpoints

### Public APIs

```
GET  /api/blog/comments?blogId={id}
     ↓
     Returns: Comment[]
     
POST /api/blog/comments
     Body: { blogId, content }
     ↓
     Returns: Comment

POST /api/blog/react
     Body: { blogId, type }
     ↓
     Returns: { success: true }

POST /api/subscribe
     Body: FormData { email }
     ↓
     Returns: Redirect to /blog?subscribed=true
```

### Admin APIs (Require Auth in Production)

```
GET  /api/admin/blogs
     ↓
     Returns: Blog[]

POST /api/admin/blogs
     Body: { title, slug, excerpt, content, ... }
     ↓
     Returns: Blog

PUT  /api/admin/blogs
     Body: { id, title, slug, excerpt, content, ... }
     ↓
     Returns: Blog

GET  /api/admin/blogs/[id]
     ↓
     Returns: Blog

DELETE /api/admin/blogs/[id]
     ↓
     Returns: { success: true }

POST /api/admin/notify-subscribers
     Body: { blogTitle, blogSlug }
     ↓
     Returns: { success: true, notified: number }
```

## State Management

### Client-Side State

```
Blog Reactions Component
├── likes (number)
├── loves (number)
├── dislikes (number)
└── userReaction (string | null)

Blog Comments Component
├── comments (Comment[])
├── newComment (string)
└── loading (boolean)

Blog Search Component
├── searchTerm (string)
└── dateFilter (string)

Admin Editor Component
├── title (string)
├── slug (string)
├── excerpt (string)
├── content (string)
├── featuredImage (string)
├── loading (boolean)
└── saving (boolean)
```

### Server-Side State

```
Supabase Database
├── blogs (persistent)
├── comments (persistent)
└── subscribers (persistent)

Next.js Cache
├── Static pages (ISR)
└── API responses (revalidate: 60)
```

## Security Layers

```
┌─────────────────────────────────────────┐
│         Browser (Client)                 │
│  • Input validation                      │
│  • XSS prevention (React)                │
└─────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│         Next.js API Routes               │
│  • Request validation                    │
│  • Rate limiting (TODO)                  │
│  • Authentication (TODO for /admin)      │
└─────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│         Supabase                         │
│  • Row Level Security (RLS)              │
│  • SQL injection prevention              │
│  • Connection pooling                    │
└─────────────────────────────────────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────────┐
│            GitHub                        │
│         (Source Code)                    │
└─────────────────────────────────────────┘
                │
                │ Push
                ▼
┌─────────────────────────────────────────┐
│         Vercel/Netlify                   │
│  • Auto-deploy on push                   │
│  • Build Next.js app                     │
│  • Serve static files                    │
│  • Run API routes                        │
└─────────────────────────────────────────┘
                │
                ├─────────────────┐
                │                 │
                ▼                 ▼
┌──────────────────────┐  ┌──────────────────────┐
│    Supabase          │  │      Resend          │
│  • Database          │  │  • Email delivery    │
│  • Real-time         │  │  • Newsletter        │
│  • Storage           │  │  • Notifications     │
└──────────────────────┘  └──────────────────────┘
```

## Performance Optimization

```
Next.js Optimizations
├── Static Generation (SSG)
│   └── Pre-render at build time
│
├── Incremental Static Regeneration (ISR)
│   └── Revalidate every 60 seconds
│
├── Image Optimization
│   └── Next.js Image component
│
├── Code Splitting
│   └── Automatic route-based splitting
│
└── Dynamic Imports
    └── React Quill loaded client-side only
```

## Monitoring & Logging

```
Production Monitoring
├── Error Tracking
│   └── Sentry (recommended)
│
├── Analytics
│   ├── Google Analytics
│   └── Vercel Analytics
│
├── Uptime Monitoring
│   └── UptimeRobot
│
└── Performance
    └── Lighthouse CI
```

## Scalability Considerations

```
Current Setup (Startup)
├── Supabase Free Tier
│   └── 500MB database, 2GB bandwidth
│
├── Resend Free Tier
│   └── 100 emails/day
│
└── Vercel Free Tier
    └── 100GB bandwidth

Future Scaling
├── Upgrade Supabase
│   └── Pro: $25/mo (8GB database, 50GB bandwidth)
│
├── Upgrade Resend
│   └── Pro: $20/mo (50k emails/mo)
│
├── Add CDN
│   └── Cloudflare for static assets
│
└── Add Caching
    └── Redis for API responses
```

## Technology Stack Summary

```
Frontend
├── Next.js 14 (React Framework)
├── TypeScript (Type Safety)
├── Tailwind CSS (Styling)
└── React Quill (Rich Text Editor)

Backend
├── Next.js API Routes (Serverless)
├── Supabase (Database & Auth)
└── Resend (Email Service)

DevOps
├── Git (Version Control)
├── Vercel/Netlify (Hosting)
└── GitHub Actions (CI/CD - optional)

Tools
├── ESLint (Linting)
├── Prettier (Formatting - optional)
└── TypeScript (Type Checking)
```

## File Size Breakdown

```
Total Project Size: ~50MB (with node_modules)

node_modules/     ~45MB  (dependencies)
app/              ~2MB   (application code)
components/       ~500KB (React components)
lib/              ~100KB (utilities)
public/           ~1MB   (static assets)
config files      ~50KB  (configuration)
documentation     ~500KB (markdown files)
```

## Request Flow Example

```
User visits /blog/my-first-post
        │
        ▼
Next.js receives request
        │
        ▼
Check if page is cached (ISR)
        │
        ├─► Yes: Return cached page
        │
        └─► No: Generate page
                │
                ▼
        Fetch blog from Supabase
                │
                ▼
        Render page with data
                │
                ▼
        Cache page (60s)
                │
                ▼
        Return HTML to browser
                │
                ▼
        Browser renders page
                │
                ▼
        Load client-side JavaScript
                │
                ▼
        Hydrate React components
                │
                ▼
        Page is interactive
```

---

This architecture is designed to be:
- **Scalable**: Can handle growth
- **Maintainable**: Clear separation of concerns
- **Secure**: Multiple security layers
- **Performant**: Optimized for speed
- **Cost-effective**: Free tier friendly
