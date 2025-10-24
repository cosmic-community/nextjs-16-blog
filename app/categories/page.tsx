import Link from 'next/link'
import { getAllCategories } from '@/lib/cosmic'
import { Category } from '@/types'

export default async function CategoriesPage() {
  const categories = await getAllCategories() as Category[]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Categories</h1>
        <p className="text-xl text-gray-600">
          Browse posts by category
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group"
            >
              <div className="p-8 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {category.metadata.name}
                </h2>
                {category.metadata.description && (
                  <p className="text-gray-600">
                    {category.metadata.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No categories available yet.</p>
        </div>
      )}
    </div>
  )
}