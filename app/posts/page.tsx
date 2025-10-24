import { getAllPosts } from '@/lib/cosmic'
import { Post } from '@/types'
import PostCard from '@/components/PostCard'

export default async function PostsPage() {
  const posts = await getAllPosts() as Post[]
  
  // Sort posts by published date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.metadata?.published_date || '').getTime();
    const dateB = new Date(b.metadata?.published_date || '').getTime();
    return dateB - dateA;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">All Posts</h1>
        <p className="text-xl text-gray-600">
          Browse our complete collection of articles
        </p>
      </div>

      {sortedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No posts available yet.</p>
        </div>
      )}
    </div>
  )
}