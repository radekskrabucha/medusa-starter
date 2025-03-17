import { buttonVariants } from '@medusa-starter/ui/button'
import { Link } from '@tanstack/react-router'
import { ShoppingCart } from 'lucide-react'
import { EmptyState } from '~web/components/EmptyState'
import { QueryBoundary } from '~web/components/QueryBoundary'
import { useGetCartQuery } from '../hooks/useGetCartQuery'
import { CartItems } from './CartItems'
import { CartSummary } from './CartSummary'

export const CartSummarySection = () => {
  const { getCartQuery } = useGetCartQuery()

  return (
    <QueryBoundary
      query={getCartQuery}
      noDataFallback={
        <EmptyState
          title="Your cart is empty"
          description="You haven't added any products to your cart yet."
          action={
            <Link
              to="/store"
              replace
              className={buttonVariants({})}
            >
              Explore products
            </Link>
          }
          icon={ShoppingCart}
        />
      }
      isDataEmpty={data => !data?.cart?.items?.length}
      isLoading={query => query.isFetching && query.isPending}
    >
      {data => (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
          <CartItems cart={data.cart} />
          <CartSummary cart={data.cart} />
        </div>
      )}
    </QueryBoundary>
  )
}
