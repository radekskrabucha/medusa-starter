import { Link } from '@tanstack/react-router'
import { appLayoutRouteApi } from '../utils'

export const Categories = () => {
  const { categoriesData } = appLayoutRouteApi.useLoaderData()

  if (!categoriesData.product_categories.length) {
    return null
  }

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-semibold">Categories</h4>
      <div className="flex flex-col gap-2">
        {categoriesData.product_categories.map(category => (
          <Link
            key={category.id}
            to="/store"
            search={{
              categories: [category.handle]
            }}
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
