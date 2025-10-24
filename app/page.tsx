import Link from 'next/link'
import { getAllPosts, getAllCategories } from '@/lib/cosmic'
import { Post, Category } from '@/types'
import PostCard from '@/components/PostCard'
import CategoryBadge from '@/components/CategoryBadge'

export default async function HomePage() {
  const posts = await getAllPosts() as Post[]
  const categories = await getAllCategories() as Category[]
  
  // Sort posts by published date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.metadata?.published_date || '').getTime();
    const dateB = new Date(b.metadata?.published_date || '').getTime();
    return dateB - dateA;
  });

  // Get featured post (most recent)
  const featuredPost = sortedPosts[0]
  const recentPosts = sortedPosts.slice(1, 4)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to Our Blog
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover insights on technology, lifestyle, and travel from our community of writers
        </p>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group"
              >
                <div className="px-6 py-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {category.metadata.name}
                  </h3>
                  {category.metadata.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {category.metadata.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Featured Post */}
      {featuredPost && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Post</h2>
          <Link href={`/posts/${featuredPost.slug}`} className="group block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {featuredPost.metadata?.featured_image && (
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={`${featuredPost.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  {featuredPost.metadata?.category && (
                    <CategoryBadge category={featuredPost.metadata.category as Category} />
                  )}
                  {featuredPost.metadata?.published_date && (
                    <span className="text-sm text-gray-500">
                      {new Date(featuredPost.metadata.published_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  )}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {featuredPost.title}
                </h3>
                {featuredPost.metadata?.excerpt && (
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {featuredPost.metadata.excerpt}
                  </p>
                )}
                {featuredPost.metadata?.author && (
                  <div className="flex items-center gap-3">
                    {featuredPost.metadata.author.metadata?.profile_photo && (
                      <img
                        src={`${featuredPost.metadata.author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                        alt={featuredPost.metadata.author.title}
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">
                        {featuredPost.metadata.author.title}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Posts</h2>
            <Link
              href="/posts"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View all posts →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No posts available yet.</p>
        </div>
      )}
    </div>
  )
}