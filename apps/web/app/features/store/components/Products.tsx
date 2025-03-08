import { buttonVariants } from '@medusa-starter/ui/button'
import { Link } from '@tanstack/react-router'
import { Shirt } from 'lucide-react'
import { EmptyState } from '~web/components/EmptyState'
import { ProductTile } from '~web/features/products/components/ProductTile'
import { storePageRouteApi } from '../utils'

export const Products = () => {
  const { products } = storePageRouteApi.useLoaderData()

  if (!products.length) {
    return (
      <EmptyState
        title="No products found"
        description="We could not find any products matching your criteria. Please change your filters or reset them."
        action={
          <Link
            to="/store"
            replace
            className={buttonVariants({ variant: 'outline' })}
          >
            Reset Filters
          </Link>
        }
        icon={Shirt}
      />
    )
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(min(calc(100vw-3rem),250px),1fr))] gap-8">
      {products.map(product => (
        <ProductTile
          key={product.id}
          product={product}
        />
      ))}
    </div>
  )
}
