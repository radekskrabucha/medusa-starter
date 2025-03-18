import { buttonVariants } from '@medusa-starter/ui/button'
import { Link } from '@tanstack/react-router'
import { orderConfirmationPageRouteApi } from '~web/features/order/utils'
import { OrderDetails } from './components/OrderDetails'
import { OrderSummary } from './components/OrderSummary'

export const OrderConfirmationPage = () => {
  const data = orderConfirmationPageRouteApi.useLoaderData()

  return (
    <section className="layout-section items-center justify-center gap-8">
      <div className="flex max-w-4xl flex-col gap-1 text-center text-balance">
        <h1 className="text-3xl font-bold">Thank you for your order!</h1>
        <p className="text-muted-foreground mt-2">
          Order number: #{data.order.display_id}
        </p>
        <p className="text-muted-foreground">
          We&apos;ll email you at{' '}
          <span className="font-bold">{data.order.email}</span> with your order
          confirmation and updates.
        </p>
      </div>
      <OrderDetails order={data.order} />
      <OrderSummary order={data.order} />

      <Link
        to="/store"
        className={buttonVariants({ variant: 'outline' })}
      >
        Continue Shopping
      </Link>
    </section>
  )
}
