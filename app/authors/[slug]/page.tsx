// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAuthorBySlug, getPostsByAuthor, getAllAuthors } from '@/lib/cosmic'
import { Author, Post } from '@/types'
import PostCard from '@/components/PostCard'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const authors = await getAllAuthors() as Author[]
  
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug) as Author | null

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id) as Post[]
  
  // Sort posts by published date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.metadata?.published_date || '').getTime();
    const dateB = new Date(b.metadata?.published_date || '').getTime();
    return dateB - dateA;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Author Profile */}
      <div className="mb-12 max-w-3xl mx-auto text-center">
        {author.metadata?.profile_photo && (
          <img
            src={`${author.metadata.profile_photo.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
            alt={author.title}
            className="w-32 h-32 rounded-full mx-auto mb-6"
          />
        )}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {author.title}
        </h1>
        {author.metadata?.bio && (
          <p className="text-xl text-gray-600 mb-6">
            {author.metadata.bio}
          </p>
        )}
        {author.metadata?.email && (
          <a
            href={`mailto:${author.metadata.email}`}
            className="text-blue-600 hover:text-blue-700"
          >
            {author.metadata.email}
          </a>
        )}
      </div>

      {/* Author's Posts */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Posts by {author.title}
        </h2>
        
        {sortedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No posts by this author yet.</p>
          </div>
        )}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 text-center">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  )
}