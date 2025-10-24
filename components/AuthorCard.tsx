import Link from 'next/link'
import { Author } from '@/types'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <Link href={`/authors/${author.slug}`} className="group block">
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center">
        {author.metadata?.profile_photo && (
          <img
            src={`${author.metadata.profile_photo.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
            alt={author.title}
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
        )}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {author.title}
        </h3>
        {author.metadata?.bio && (
          <p className="text-gray-600 text-sm line-clamp-3">
            {author.metadata.bio}
          </p>
        )}
      </div>
    </Link>
  )
}