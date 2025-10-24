import Link from 'next/link'
import { Post, Category } from '@/types'
import CategoryBadge from './CategoryBadge'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
        {post.metadata?.featured_image && (
          <div className="aspect-video relative overflow-hidden">
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-3 mb-3">
            {post.metadata?.category && (
              <CategoryBadge category={post.metadata.category as Category} />
            )}
            {post.metadata?.published_date && (
              <span className="text-sm text-gray-500">
                {new Date(post.metadata.published_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {post.metadata?.excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
              {post.metadata.excerpt}
            </p>
          )}

          {post.metadata?.author && (
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
              {post.metadata.author.metadata?.profile_photo && (
                <img
                  src={`${post.metadata.author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.title}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="text-sm font-medium text-gray-700">
                {post.metadata.author.title}
              </span>
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}