# 🏢 AgriLearn Project Architecture & Context
> **Note for AI Agents**: This document provides a high-level technical overview of the AgriLearn project. Read this first to understand the architecture, stack, and patterns before suggesting changes.

## 🌟 Project Overview
AgriLearn is a comprehensive platform for **UPT BLK Wonojati**, designed to bridge the gap between vocational training and the agribusiness industry. It features an informative landing page for the public and a robust management dashboard for administrators.

## 🛠️ Technology Stack
### Core Frameworks
- **Framework**: [Next.js 16](https://nextjs.org) (App Router Architecture)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Runtime**: Node.js

### UI & UX
- **Components**: [Shadcn UI](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Rich Text**: `react-quill-new` (for article editing)

### Backend & Data
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Auth**: [Next-Auth v5 (Beta)](https://authjs.dev/) with Supabase Adapter
- **Storage**: Supabase Storage for media & documents
- **Excel Handling**: `xlsx` (for data import/export)

---

## 📂 Folder Structure & Key Files
```text
agrilearn-landing/
├── src/
│   ├── app/                    # App Router Root
│   │   ├── (marketing)/        # Public Routes (Landing, Careers, News)
│   │   ├── (dashboard)/        # Internal Routes
│   │   │   └── admin/          # Admin Dashboard Panel
│   │   ├── api/                # API Routes (Auth handlers, etc.)
│   │   └── layout.tsx          # Root Layout
│   ├── components/             # UI Components
│   │   ├── dashboard/          # Admin-specific components
│   │   └── ui/                 # Shadcn/Base components
│   ├── lib/                    # Configuration & Utilities
│   │   ├── supabase.ts         # Supabase Client
│   │   ├── auth.ts             # Next-Auth configuration
│   │   └── animations.ts       # Shared Framer Motion variants
│   ├── proxy.ts                # Application Middleware (Redirect Logic)
│   └── types/                  # Global Type Definitions
├── next.config.ts              # Next.js Configuration (Image domains)
└── package.json                # Dependencies & Scripts
```

---

## 🛤️ Important Routes
| Feature | Path | Group | Access |
| :--- | :--- | :--- | :--- |
| **Landing Page** | `/` | Marketing | Public |
| **Login** | `/login` | Marketing | Public |
| **Job Vacancies** | `/lowongan-kerja` | Marketing | Public |
| **News/Berita** | `/berita` | Marketing | Public |
| **Admin Panel** | `/admin` | Dashboard | Admin Only |
| **Manage Jobs** | `/admin/lowongan-kerja` | Dashboard | Admin Only |
| **Manage News** | `/admin/berita` | Dashboard | Admin Only |
| **Manage Trainees** | `/admin/peserta` | Dashboard | Admin Only |
| **Manage Applicants** | `/admin/pelamar` | Dashboard | Admin Only |
| **Linktree Manager** | `/admin/links` | Dashboard | Admin Only |
| **Settings** | `/admin/settings` | Dashboard | Admin Only |

### UI Components & Iconography
- **Icons**: The project primarily uses **Lucide React** for component-level icons and **Material Symbols Outlined** for navigation/sidebar icons.
- **Components**: UI follows a premium card-based layout with high use of `glassmorphism` and `border-primary/10` subtle borders.

---

## 🔐 Logic & Patterns
### 1. Middleware / Route Protection
Protection logic resides in `src/proxy.ts`. It handles:
- Redirecting non-authenticated users from `/admin` to `/login`.
- Ensuring only users with the `admin` role can access the dashboard.
- Preventing logged-in admins from accessing the `/login` page.

### 2. Authentication Flow
- Powered by `Next-Auth` using a **Credentials Provider**.
- Authenticates against Supabase Auth.
- Fetches additional user data (like `role`) from the `profiles` table in Supabase.

### Typography & Design Tokens
- **Body Font**: `Plus_Jakarta_Sans` (`--font-sans`)
- **Display/Heading Font**: `Bricolage_Grotesque` (`--font-display`)
- **Colors**: Primary color is a professional blue/slate, Accent is used for primary buttons.
- **Glassmorphism**: Widely used in cards and navigation bars.

### SEO & Metadata
- **Base Domain**: `blkwonojati.site`
- **Metadata**: Managed centrally in `src/app/layout.tsx`.
- **JSON-LD**: Organization schema implemented in the root layout.
- **Sitemap/Robots**: Located at `src/app/sitemap.ts` and `src/app/robots.ts`.

### 4. Database Interaction
- Always use the Supabase client from `@/lib/supabase`.
- Primary Tables: `profiles`, `lowongan`, `berita`, `pelamar`, `peserta`.

## 💾 Database Tables & Schema
The project uses Supabase (PostgreSQL). Below are the core tables and their key fields:

### 1. `lowongan_kerja`
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `posisi` | Text | Name of the job position |
| `instansi_perusahaan` | Text | Company/Industry name |
| `lokasi` | Text | Job location |
| `tipe_pekerjaan` | Text | Full-time, Internship, etc. |
| `batas_lamaran` | Timestamptz | Application deadline |
| `link_pendaftaran` | Text | External application URL |
| `poster_url` | Text | URL for the job poster image |
| `jurusan` | Text | Relevant training department |
| `is_active` | Boolean | Visibility toggle |
| `views_count` | BigInt | Number of views (tracked via RPC) |

### 2. `berita`
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `title` | Text | Article title |
| `excerpt` | Text | Short summary for previews |
| `content` | Text | Full content in HTML format |
| `image_url` | Text | Header image URL |
| `category` | Text | e.g., 'Berita', 'Pengumuman' |
| `published_at` | Timestamptz | Date of publication |

### 3. `profiles`
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Linked to `auth.users` |
| `full_name` | Text | User's full name |
| `role` | Text | 'admin' or 'user' |

---

## 🚀 Key Configurations
### 1. Image Hosting (GitHub + JSDelivr)
The project uses a custom storage solution via GitHub:
- **Provider**: GitHub Repository as a CDN.
- **Access**: Images are served via `cdn.jsdelivr.net`.
- **Implementation**: `src/lib/github.ts` handles uploads/deletions.
- **Environment Variables**: `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_BRANCH`, `GITHUB_PATH`.

### 2. Next.js Config (`next.config.ts`)
Configured to allow external optimized images from:
- `images.unsplash.com`
- `**.supabase.co`
- `blue.kumparan.com` (likely for news references)
- `cdn.jsdelivr.net` (implicitly used for posters)

### 3. Application Middleware
- Current filename: `src/proxy.ts`
- Purpose: Centralized auth guard and role-based routing.

## 🤖 AI Onboarding Checklist
When starting a new session, verify:
1. **Current Environment**: Check `.env.local` for Supabase connectivity.
2. **Component Reuse**: Check `src/components/ui` before creating new primitive components.
3. **Responsive Design**: All new features must be mobile-first.
4. **Hydration**: Be cautious with `framer-motion` and `lenis` to avoid hydration mismatches in Next.js.

---
*This document is the source of truth for AI agents working on AgriLearn.*
