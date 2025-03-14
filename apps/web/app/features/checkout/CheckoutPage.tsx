import { getIsCartReadyToPay } from '@medusa-starter/medusa-utils/cart'
import { buttonVariants } from '@medusa-starter/ui/button'
import { Link } from '@tanstack/react-router'
import { useAtom } from 'jotai'
import { ShoppingCart, ShoppingBag } from 'lucide-react'
import { EmptyState } from '~web/components/EmptyState'
import { QueryBoundary } from '~web/components/QueryBoundary'
import { useGetCartQuery } from '../cart/hooks/useGetCartQuery'
import { AddressStep } from './components/AddressStep'
import { OrderSummary } from './components/OrderSummary'
import { ReviewStep } from './components/PayStep'
import { PaymentProviderStep } from './components/PaymentProviderStep'
import { ShippingOptionsStep } from './components/ShippingOptionsStep'
import { checkoutStepAtom } from './store/checkoutStep'

export const CheckoutPage = () => {
  const { getCartQuery, cartId } = useGetCartQuery()
  const [step, setStep] = useAtom(checkoutStepAtom)

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
        {data => {
          const isAddressFilled =
            Boolean(data.cart.email) &&
            Boolean(data.cart.shipping_address) &&
            Boolean(data.cart.billing_address)
          const isShippingFilled = Boolean(data.cart.shipping_methods?.length)
          const paymentProviderId =
            data.cart.payment_collection?.payment_sessions?.[0]?.provider_id
          const isCartReadyToPay = getIsCartReadyToPay(data.cart)

          return (
            <div className="grid grid-cols-[1fr_400px] gap-8 max-lg:grid-cols-1">
              <div className="flex flex-col gap-8">
                <AddressStep
                  step="address"
                  isActive={addressStep => addressStep === step}
                  cart={data.cart}
                  onSelect={setStep}
                  onNext={() => setStep('shipping')}
                  isFilled={isAddressFilled}
                />
                <ShippingOptionsStep
                  step="shipping"
                  isActive={shippingStep => shippingStep === step}
                  onSelect={setStep}
                  onNext={() => setStep('payment')}
                  cart={data.cart}
                  isFilled={isShippingFilled}
                />
                <PaymentProviderStep
                  step="payment"
                  isActive={paymentStep => paymentStep === step}
                  onSelect={setStep}
                  onNext={() => setStep('review')}
                  isFilled={Boolean(paymentProviderId)}
                  regionId={data.cart.region_id ?? ''}
                  cart={data.cart}
                  providerId={paymentProviderId}
                />
                <ReviewStep
                  step="review"
                  isActive={reviewStep => reviewStep === step}
                />
              </div>
              <OrderSummary cart={data.cart} />
            </div>
          )
        }}
      </QueryBoundary>
    </section>
  )
}
