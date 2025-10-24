import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">Next.js 16 Blog</span>
          </Link>
          
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/posts"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Posts
            </Link>
            <Link
              href="/categories"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Categories
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}