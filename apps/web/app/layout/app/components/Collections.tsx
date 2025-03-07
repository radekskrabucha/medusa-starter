import { Link } from '@tanstack/react-router'
import { appLayoutRouteApi } from '../utils'

export const Collections = () => {
  const collections = appLayoutRouteApi.useLoaderData()

  if (!collections.length) {
    return null
  }

  return (
    <div className="flex flex-col gap-4">
      <Link
        to="/collections"
        className="font-semibold"
      >
        Collections
      </Link>
      <div className="flex flex-col gap-2">
        {collections.map(collection => (
          <Link
            key={collection.id}
            to="/collections/$handle"
            params={{ handle: collection.handle }}
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            {collection.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
