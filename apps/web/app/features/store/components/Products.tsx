import { buttonVariants } from '@medusa-starter/ui/button'
import { Link } from '@tanstack/react-router'
import { Shirt } from 'lucide-react'
import { EmptyState } from '~web/components/EmptyState'
import { PaginationWithMeta } from '~web/components/PaginationWithMeta'
import { ProductTile } from '~web/features/products/components/ProductTile'
import { storePageRouteApi } from '../utils'

export const Products = () => {
  const { productsData } = storePageRouteApi.useLoaderData()
  const { page } = storePageRouteApi.useSearch()

  if (!productsData.products.length) {
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
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(calc(100vw-3rem),250px),1fr))] gap-8">
        {productsData.products.map(product => (
          <ProductTile
            key={product.id}
            product={product}
          />
        ))}
      </div>
      <PaginationWithMeta
        page={page ?? 1}
        limit={productsData.limit}
        offset={productsData.offset}
        total={productsData.count}
        to="/store"
        getQuery={page => ({
          search: {
            page
          }
        })}
      />
    </>
  )
}
