// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { getPostBySlug, getAllPosts } from '@/lib/cosmic'
import { Post, Category } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts() as Post[]
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug) as Post | null

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          {post.metadata?.category && (
            <CategoryBadge category={post.metadata.category as Category} />
          )}
          {post.metadata?.published_date && (
            <span className="text-sm text-gray-500">
              {new Date(post.metadata.published_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          )}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {post.title}
        </h1>

        {post.metadata?.excerpt && (
          <p className="text-xl text-gray-600 mb-8">
            {post.metadata.excerpt}
          </p>
        )}

        {/* Author */}
        {post.metadata?.author && (
          <Link
            href={`/authors/${post.metadata.author.slug}`}
            className="flex items-center gap-4 group"
          >
            {post.metadata.author.metadata?.profile_photo && (
              <img
                src={`${post.metadata.author.metadata.profile_photo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
                alt={post.metadata.author.title}
                className="w-12 h-12 rounded-full"
              />
            )}
            <div>
              <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                {post.metadata.author.title}
              </p>
              {post.metadata.author.metadata?.bio && (
                <p className="text-sm text-gray-600 line-clamp-1">
                  {post.metadata.author.metadata.bio}
                </p>
              )}
            </div>
          </Link>
        )}
      </header>

      {/* Featured Image */}
      {post.metadata?.featured_image && (
        <div className="mb-12 rounded-lg overflow-hidden">
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {post.metadata?.content && (
          <ReactMarkdown>{post.metadata.content}</ReactMarkdown>
        )}
      </div>

      {/* Back Link */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link
          href="/posts"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to all posts
        </Link>
      </div>
    </article>
  )
}