# Next.js 16 Blog Platform

![App Preview](https://imgix.cosmicjs.com/295fda80-b0f1-11f0-a077-bd105f10469e-photo-1555066931-4365d14bab8c-1761321027484.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, high-performance blog platform built with Next.js 16 and Cosmic CMS, featuring the latest improvements in routing, caching, and developer experience.

## Features

- 🚀 **Next.js 16 with Turbopack** - Up to 10× faster Fast Refresh and 2-5× faster production builds
- 📝 **Dynamic Blog Posts** - Full markdown support with syntax highlighting
- 👤 **Author Profiles** - Detailed author pages with biographical information
- 🏷️ **Category Filtering** - Browse posts by Technology, Lifestyle, and Travel categories
- 📱 **Responsive Design** - Mobile-first design with Tailwind CSS
- 🖼️ **Optimized Images** - Automatic image optimization with imgix
- ⚡ **Enhanced Routing** - Layout deduplication and incremental prefetching for faster navigation
- 🔍 **SEO Optimized** - Proper metadata and semantic HTML structure
- 🎨 **Modern UI** - Clean, minimalist design with Inter font family

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68fb9fc092c9229c30fe422f&clone_repository=68fba14192c9229c30fe424e)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, authors, and categories"

### Code Generation Prompt

> "Based on the content model I created for 'Create a content model for a blog with posts, authors, and categories', now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface. Use Next.js 16"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** - React framework with App Router and Turbopack
- **React 19.2** - Latest React features including View Transitions
- **TypeScript** - Type-safe development with comprehensive interfaces
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Cosmic CMS** - Headless CMS for content management
- **imgix** - Image optimization and transformation
- **React Markdown** - Markdown rendering for blog content

## Getting Started

### Prerequisites

- Node.js 20.9 or higher
- A Cosmic account with the blog content model set up

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd nextjs-16-blog
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
Create a `.env.local` file with your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching All Posts

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Post

```typescript
const { object: post } = await cosmic.objects
  .findOne({
    type: 'posts',
    slug: 'your-post-slug'
  })
  .depth(1)
```

### Fetching Posts by Category

```typescript
const { objects: posts } = await cosmic.objects
  .find({
    type: 'posts',
    'metadata.category': categoryId
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application integrates with Cosmic CMS to manage all blog content:

- **Posts** (`posts`): Blog posts with title, content (markdown), featured images, excerpts, authors, categories, and published dates
- **Authors** (`authors`): Author profiles with names, bios, profile photos, and email addresses
- **Categories** (`categories`): Content categories with names and descriptions

All content is fetched server-side for optimal performance and SEO. The application uses Next.js 16's enhanced routing and caching features to ensure fast page loads and smooth navigation.

## Deployment Options

### Deploy to Vercel

The easiest way to deploy this Next.js app is with Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the button above
2. Connect your GitHub repository
3. Add your environment variables (`COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`)
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Import your repository in Netlify
3. Add environment variables in the Netlify dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these environment variables in your hosting platform:
- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key

## Project Structure

```
nextjs-16-blog/
├── app/
│   ├── layout.tsx              # Root layout with navigation
│   ├── page.tsx                # Home page with featured posts
│   ├── posts/
│   │   ├── page.tsx            # All posts listing
│   │   └── [slug]/
│   │       └── page.tsx        # Individual post pages
│   ├── categories/
│   │   ├── page.tsx            # All categories
│   │   └── [slug]/
│   │       └── page.tsx        # Posts by category
│   ├── authors/
│   │   └── [slug]/
│   │       └── page.tsx        # Author profile pages
│   └── globals.css             # Global styles
├── components/
│   ├── PostCard.tsx            # Post card component
│   ├── CategoryBadge.tsx       # Category badge component
│   ├── AuthorCard.tsx          # Author card component
│   ├── Navigation.tsx          # Navigation component
│   └── CosmicBadge.tsx         # Cosmic badge component
├── lib/
│   └── cosmic.ts               # Cosmic SDK configuration
├── types.ts                    # TypeScript interfaces
├── public/
│   └── dashboard-console-capture.js  # Console logging for dashboard
└── next.config.ts              # Next.js configuration
```

<!-- README_END -->