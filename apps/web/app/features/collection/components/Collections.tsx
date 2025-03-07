import { buttonVariants } from '@medusa-starter/ui/button'
import { Link } from '@tanstack/react-router'
import { ShoppingBag } from 'lucide-react'
import { EmptyState } from '~web/components/EmptyState'
import { collectionsPageRouteApi } from '../utils'
import { CollectionSummaryTile } from './CollectionSummaryTile'

export const Collections = () => {
  const { collections } = collectionsPageRouteApi.useLoaderData()

  if (!collections.length) {
    return (
      <EmptyState
        title="No collections yet"
        description="We are working hard to add more collections to our store. Stay tuned!"
        action={
          <Link
            to="/shop"
            className={buttonVariants({ variant: 'outline' })}
          >
            See all products
          </Link>
        }
        icon={ShoppingBag}
      />
    )
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(min(calc(100vw-3rem),300px),1fr))] gap-8">
      {collections.map(collection => (
        <CollectionSummaryTile
          key={collection.id}
          collection={collection}
        />
      ))}
    </div>
  )
}
