import { QueryBoundary } from '~web/components/QueryBoundary'
import { useGetCartQuery } from '../cart/hooks/useGetCartQuery'
import { EmailForm } from './components/EmailForm'

export const CheckoutPage = () => {
  const { getCartQuery, cartId } = useGetCartQuery()

  if (!cartId) {
    throw new Error('No cart id found')
  }
  if (getCartQuery.data && !getCartQuery.data.cart.items?.length) {
    throw new Error('Cart is empty')
  }

  return (
    <section className="layout-section gap-8">
      <h2 className="text-4xl font-semibold">Checkout</h2>
      <QueryBoundary query={getCartQuery}>
        {data => (
          <EmailForm
            email={data.cart.email}
            cartId={cartId}
          />
        )}
      </QueryBoundary>
    </section>
  )
}
