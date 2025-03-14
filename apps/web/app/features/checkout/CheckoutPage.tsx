import { buttonVariants } from '@medusa-starter/ui/button'
import { Link } from '@tanstack/react-router'
import { ShoppingCart, ShoppingBag } from 'lucide-react'
import { EmptyState } from '~web/components/EmptyState'
import { QueryBoundary } from '~web/components/QueryBoundary'
import { useGetCartQuery } from '../cart/hooks/useGetCartQuery'
import { Checkout } from './components/Checkout'

export const CheckoutPage = () => {
  const { getCartQuery, cartId } = useGetCartQuery()

  if (!cartId) {
    return (
      <section className="layout-section">
        <EmptyState
          title="No cart found"
          description="We couldn't find your shopping cart. Please try starting a new shopping session."
          action={
            <Link
              to="/"
              className={buttonVariants({})}
            >
              Start Shopping
            </Link>
          }
          icon={ShoppingBag}
        />
      </section>
    )
  }

  return (
    <section className="layout-section gap-8">
      <h2 className="text-3xl font-semibold">Checkout</h2>
      <QueryBoundary
        query={getCartQuery}
        isDataEmpty={data => !data?.cart?.items?.length}
        noDataFallback={
          <EmptyState
            title="Your cart is empty"
            description="Add some items to your cart to proceed with checkout."
            action={
              <Link
                to="/"
                className={buttonVariants({})}
              >
                Continue Shopping
              </Link>
            }
            icon={ShoppingCart}
          />
        }
      >
        {data => <Checkout cart={data.cart} />}
      </QueryBoundary>
    </section>
  )
}
