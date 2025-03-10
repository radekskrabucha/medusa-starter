import { Link } from '@tanstack/react-router'
import { appLayoutRouteApi } from '../utils'

// TODO: links to categories - for now to store
export const Categories = () => {
  const { categoriesData } = appLayoutRouteApi.useLoaderData()

  if (!categoriesData.product_categories.length) {
    return null
  }

  return (
    <div className="flex flex-col gap-4">
      <Link
        to="/store"
        className="font-semibold"
      >
        Categories
      </Link>
      <div className="flex flex-col gap-2">
        {categoriesData.product_categories.map(category => (
          <Link
            key={category.id}
            to="/store"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
