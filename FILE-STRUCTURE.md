# iWrite Website - Complete File Structure

## 📁 Project Root

```
iwrite-website/
│
├── 📄 Configuration Files
│   ├── .env.local                    # Environment variables (DO NOT COMMIT)
│   ├── .eslintrc.json                # ESLint configuration
│   ├── .gitignore                    # Git ignore rules
│   ├── next.config.mjs               # Next.js configuration
│   ├── next-env.d.ts                 # Next.js TypeScript definitions
│   ├── package.json                  # Dependencies and scripts
│   ├── postcss.config.mjs            # PostCSS configuration
│   ├── tailwind.config.ts            # Tailwind CSS configuration
│   └── tsconfig.json                 # TypeScript configuration
│
├── 📚 Documentation
│   ├── START-HERE.md                 # ⭐ Quick start guide
│   ├── INDEX.md                      # Documentation index
│   ├── README.md                     # Project overview
│   ├── WINDOWS-INSTALL.md            # Windows installation guide
│   ├── SETUP-GUIDE.md                # Detailed setup instructions
│   ├── ADMIN-ACCESS.md               # Admin dashboard guide
│   ├── QUICK-REFERENCE.md            # Quick reference cheat sheet
│   ├── PROJECT-SUMMARY.md            # Complete feature list
│   ├── DEPLOYMENT-CHECKLIST.md       # Production deployment guide
│   ├── ARCHITECTURE.md               # System architecture
│   ├── FILE-STRUCTURE.md             # This file
│   └── supabase-schema.sql           # Database schema
│
├── 📱 Application Code
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout (Navbar + Footer)
│   │   ├── page.tsx                  # Home page
│   │   ├── globals.css               # Global styles
│   │   ├── not-found.tsx             # 404 page
│   │   │
│   │   ├── services/                 # Services section
│   │   │   └── page.tsx              # Services page
│   │   │
│   │   ├── blog/                     # Blog section
│   │   │   ├── page.tsx              # Blog listing page
│   │   │   └── [slug]/               # Dynamic blog post
│   │   │       └── page.tsx          # Individual blog post page
│   │   │
│   │   ├── contact/                  # Contact section
│   │   │   └── page.tsx              # Contact form page
│   │   │
│   │   ├── careers/                  # Careers section
│   │   │   └── page.tsx              # Careers/application page
│   │   │
│   │   ├── admin/                    # Admin section
│   │   │   ├── page.tsx              # Admin dashboard
│   │   │   └── editor/               # Blog editor
│   │   │       └── [[...id]]/        # Create/edit blog post
│   │   │           └── page.tsx      # Rich text editor page
│   │   │
│   │   └── api/                      # API Routes
│   │       ├── blog/                 # Public blog APIs
│   │       │   ├── react/            # Reactions API
│   │       │   │   └── route.ts      # Handle likes/loves/dislikes
│   │       │   └── comments/         # Comments API
│   │       │       └── route.ts      # Handle comments
│   │       │
│   │       ├── admin/                # Admin APIs
│   │       │   ├── blogs/            # Blog CRUD
│   │       │   │   ├── route.ts      # List/Create/Update blogs
│   │       │   │   └── [id]/         # Single blog operations
│   │       │   │       └── route.ts  # Get/Delete blog
│   │       │   └── notify-subscribers/
│   │       │       └── route.ts      # Send newsletter
│   │       │
│   │       └── subscribe/            # Newsletter subscription
│   │           └── route.ts          # Handle subscriptions
│   │
│   ├── components/                   # React Components
│   │   ├── Navbar.tsx                # Navigation bar
│   │   ├── Footer.tsx                # Footer
│   │   ├── BlogSearch.tsx            # Blog search component
│   │   ├── BlogReactions.tsx         # Like/love/dislike buttons
│   │   └── BlogComments.tsx          # Comments section
│   │
│   └── lib/                          # Utility Libraries
│       ├── supabase.ts               # Supabase client & types
│       └── resend.ts                 # Email service
│
└── 📦 Dependencies
    └── node_modules/                 # Installed packages (auto-generated)
```

## 📄 File Descriptions

### Configuration Files

| File | Purpose |
|------|---------|
| `.env.local` | Environment variables (Supabase, Resend keys) |
| `.eslintrc.json` | Code linting rules |
| `.gitignore` | Files to exclude from Git |
| `next.config.mjs` | Next.js settings (image domains, etc.) |
| `package.json` | Project dependencies and scripts |
| `tailwind.config.ts` | Custom colors and theme |
| `tsconfig.json` | TypeScript compiler options |

### Documentation Files

| File | Purpose |
|------|---------|
| `START-HERE.md` | Quick start guide (read this first!) |
| `INDEX.md` | Documentation navigation |
| `README.md` | Project overview |
| `WINDOWS-INSTALL.md` | Step-by-step Windows setup |
| `SETUP-GUIDE.md` | Detailed configuration |
| `ADMIN-ACCESS.md` | Admin panel usage |
| `QUICK-REFERENCE.md` | Commands and tips |
| `PROJECT-SUMMARY.md` | Complete feature list |
| `DEPLOYMENT-CHECKLIST.md` | Production deployment |
| `ARCHITECTURE.md` | System design |
| `supabase-schema.sql` | Database setup |

### Application Pages

| File | Route | Purpose |
|------|-------|---------|
| `app/page.tsx` | `/` | Home page |
| `app/services/page.tsx` | `/services` | Services listing |
| `app/blog/page.tsx` | `/blog` | Blog listing |
| `app/blog/[slug]/page.tsx` | `/blog/post-slug` | Individual blog post |
| `app/contact/page.tsx` | `/contact` | Contact form |
| `app/careers/page.tsx` | `/careers` | Writer applications |
| `app/admin/page.tsx` | `/admin` | Admin dashboard |
| `app/admin/editor/[[...id]]/page.tsx` | `/admin/editor` | Blog editor |

### API Routes

| File | Endpoint | Method | Purpose |
|------|----------|--------|---------|
| `app/api/blog/react/route.ts` | `/api/blog/react` | POST | Add reaction |
| `app/api/blog/comments/route.ts` | `/api/blog/comments` | GET/POST | Comments |
| `app/api/subscribe/route.ts` | `/api/subscribe` | POST | Subscribe |
| `app/api/admin/blogs/route.ts` | `/api/admin/blogs` | GET/POST/PUT | Blog CRUD |
| `app/api/admin/blogs/[id]/route.ts` | `/api/admin/blogs/[id]` | GET/DELETE | Single blog |
| `app/api/admin/notify-subscribers/route.ts` | `/api/admin/notify-subscribers` | POST | Newsletter |

### Components

| File | Purpose |
|------|---------|
| `components/Navbar.tsx` | Top navigation with logo and links |
| `components/Footer.tsx` | Footer with links and info |
| `components/BlogSearch.tsx` | Search and filter blogs |
| `components/BlogReactions.tsx` | Like/love/dislike buttons |
| `components/BlogComments.tsx` | Comment list and form |

### Libraries

| File | Purpose |
|------|---------|
| `lib/supabase.ts` | Supabase client and TypeScript types |
| `lib/resend.ts` | Email sending functions |

## 📊 File Statistics

```
Total Files: ~40 files
├── TypeScript/TSX: ~25 files
├── Documentation: ~12 files
├── Configuration: ~8 files
└── SQL: 1 file

Lines of Code: ~3,500 lines
├── Application Code: ~2,000 lines
├── Documentation: ~1,500 lines
└── Configuration: ~100 lines

Total Size: ~50MB (with node_modules)
├── node_modules: ~45MB
├── Application: ~2MB
├── Documentation: ~500KB
└── Configuration: ~50KB
```

## 🎯 Key Files to Know

### For Development
1. **`app/page.tsx`** - Home page (start customizing here)
2. **`app/globals.css`** - Global styles
3. **`tailwind.config.ts`** - Theme colors
4. **`components/Navbar.tsx`** - Navigation
5. **`.env.local`** - Environment variables

### For Content Creation
1. **`/admin`** - Admin dashboard (in browser)
2. **`/admin/editor`** - Blog editor (in browser)
3. **`supabase-schema.sql`** - Database structure

### For Deployment
1. **`DEPLOYMENT-CHECKLIST.md`** - Deployment guide
2. **`.env.local`** - Update for production
3. **`next.config.mjs`** - Production settings

## 📝 File Naming Conventions

### Pages
- `page.tsx` - Route page component
- `layout.tsx` - Layout wrapper
- `not-found.tsx` - 404 error page

### API Routes
- `route.ts` - API endpoint handler

### Components
- `PascalCase.tsx` - React components
- Example: `BlogSearch.tsx`, `Navbar.tsx`

### Utilities
- `camelCase.ts` - Utility functions
- Example: `supabase.ts`, `resend.ts`

### Documentation
- `UPPERCASE.md` - Documentation files
- Example: `README.md`, `SETUP-GUIDE.md`

## 🔍 Finding Files

### By Feature

**Home Page**
- `app/page.tsx`
- `components/Navbar.tsx`
- `components/Footer.tsx`

**Blog System**
- `app/blog/page.tsx` (listing)
- `app/blog/[slug]/page.tsx` (post)
- `components/BlogReactions.tsx`
- `components/BlogComments.tsx`
- `app/api/blog/` (APIs)

**Admin Panel**
- `app/admin/page.tsx` (dashboard)
- `app/admin/editor/[[...id]]/page.tsx` (editor)
- `app/api/admin/` (APIs)

**Forms**
- `app/contact/page.tsx` (contact)
- `app/careers/page.tsx` (careers)
- `app/api/subscribe/route.ts` (newsletter)

### By Technology

**Next.js**
- `app/` folder (App Router)
- `next.config.mjs`
- `next-env.d.ts`

**TypeScript**
- `*.tsx` files (React components)
- `*.ts` files (utilities, APIs)
- `tsconfig.json`

**Tailwind CSS**
- `app/globals.css`
- `tailwind.config.ts`
- `postcss.config.mjs`

**Supabase**
- `lib/supabase.ts`
- `supabase-schema.sql`
- API routes using Supabase

**Resend**
- `lib/resend.ts`
- `app/api/admin/notify-subscribers/route.ts`

## 🚫 Files to Never Edit

- `node_modules/` - Auto-generated dependencies
- `next-env.d.ts` - Auto-generated by Next.js
- `.next/` - Build output (not in repo)

## ✏️ Files You'll Edit Most

1. **Content**
   - `app/page.tsx` (home content)
   - `app/services/page.tsx` (services)
   - `components/Footer.tsx` (footer links)

2. **Styling**
   - `app/globals.css` (global styles)
   - `tailwind.config.ts` (colors)

3. **Configuration**
   - `.env.local` (credentials)
   - `next.config.mjs` (settings)

## 📦 Generated Files (Not in Git)

```
.next/                  # Build output
node_modules/           # Dependencies
.env.local             # Local environment (in .gitignore)
```

## 🔐 Sensitive Files

These files contain secrets and should NEVER be committed:

- `.env.local` - Contains API keys
- `node_modules/` - Contains dependencies

Both are already in `.gitignore`.

## 📚 Documentation Organization

```
Documentation/
├── Getting Started
│   ├── START-HERE.md
│   ├── WINDOWS-INSTALL.md
│   └── SETUP-GUIDE.md
│
├── Usage
│   ├── ADMIN-ACCESS.md
│   └── QUICK-REFERENCE.md
│
├── Reference
│   ├── PROJECT-SUMMARY.md
│   ├── ARCHITECTURE.md
│   └── FILE-STRUCTURE.md
│
└── Deployment
    └── DEPLOYMENT-CHECKLIST.md
```

## 🎨 Asset Organization

Currently using external assets:
- **Images**: Picsum Photos (https://picsum.photos)
- **Icons**: SVG inline in components
- **Fonts**: Google Fonts (loaded via CDN)

To add your own assets:
1. Create `public/` folder
2. Add images to `public/images/`
3. Reference as `/images/filename.jpg`

## 🔄 Build Output

When you run `npm run build`:

```
.next/
├── cache/              # Build cache
├── server/             # Server-side code
├── static/             # Static assets
└── types/              # Generated types
```

This folder is auto-generated and not committed to Git.

## 📖 Reading Order

For understanding the codebase:

1. **Start**: `app/layout.tsx` (root layout)
2. **Home**: `app/page.tsx` (home page)
3. **Components**: `components/Navbar.tsx`
4. **Blog**: `app/blog/page.tsx`
5. **Admin**: `app/admin/page.tsx`
6. **APIs**: `app/api/blog/comments/route.ts`
7. **Utils**: `lib/supabase.ts`

---

**Need to find something?** Use your editor's file search (Ctrl+P in VS Code) or check [INDEX.md](INDEX.md) for documentation.
