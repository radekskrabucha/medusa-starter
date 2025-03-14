import { getIsCartReadyToPay } from '@medusa-starter/medusa-utils/cart'
import type { Cart } from '@medusa-starter/medusa-utils/models'
import { useState } from 'react'
import type { CheckoutStep } from '../types'
import { getActiveStep } from '../utils'
import { AddressStep } from './AddressStep'
import { OrderSummary } from './OrderSummary'
import { PaymentProviderStep } from './PaymentProviderStep'
import { ReviewStep } from './ReviewStep'
import { ShippingOptionsStep } from './ShippingOptionsStep'

type CheckoutProps = {
  cart: Cart
}

export const Checkout: React.FC<CheckoutProps> = ({ cart }) => {
  const initialStep = getActiveStep(cart)
  console.log({ initialStep })
  const [step, setStep] = useState<CheckoutStep>(initialStep)

  const isAddressFilled =
    Boolean(cart.email) &&
    Boolean(cart.shipping_address) &&
    Boolean(cart.billing_address)
  const isShippingFilled = Boolean(cart.shipping_methods?.length)
  const paymentProviderId =
    cart.payment_collection?.payment_sessions?.[0]?.provider_id
  const isCartReadyToPay = getIsCartReadyToPay(cart)

  return (
    <div className="grid grid-cols-[1fr_400px] gap-8 max-lg:grid-cols-1">
      <div className="flex flex-col gap-8">
        <AddressStep
          step="address"
          isActive={addressStep => addressStep === step}
          cart={cart}
          onSelect={setStep}
          onNext={() => setStep('shipping')}
          isFilled={isAddressFilled}
        />
        <ShippingOptionsStep
          step="shipping"
          isActive={shippingStep => shippingStep === step}
          onSelect={setStep}
          onNext={() => setStep('payment')}
          cart={cart}
          isFilled={isShippingFilled}
        />
        <PaymentProviderStep
          step="payment"
          isActive={paymentStep => paymentStep === step}
          onSelect={setStep}
          onNext={() => setStep('review')}
          isFilled={Boolean(paymentProviderId)}
          regionId={cart.region_id ?? ''}
          cart={cart}
          providerId={paymentProviderId}
        />
        <ReviewStep
          step="review"
          isActive={reviewStep => reviewStep === step}
        />
      </div>
      <OrderSummary cart={cart} />
    </div>
  )
}
