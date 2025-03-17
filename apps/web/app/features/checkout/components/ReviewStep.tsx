import type { Cart } from '@medusa-starter/medusa-utils/models'
import { PaymentProviderIds } from '@medusa-starter/medusa-utils/payment'
import { Button } from '@medusa-starter/ui/button'
import { LoadingCircleIndicator } from '@medusa-starter/ui/loading-circle-indicator'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { EmptyState } from '~web/components/EmptyState'
import { cartIdStore } from '~web/features/cart/utils'
import { actions } from '~web/lib/medusa'
import type { CheckoutStep } from '../types'
import { StepWrapper } from './StepWrapper'

type ReviewStep = Extract<CheckoutStep, 'review'>

type ReviewStepProps = {
  step: ReviewStep
  isActive: (step: ReviewStep) => boolean
  cart: Cart
  isCartReadyToPay: boolean
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  step,
  isActive,
  cart,
  isCartReadyToPay
}) => {
  const active = isActive(step)

  return (
    <StepWrapper
      title="Review"
      isFilled={false}
      isActive={active}
      onSelect={undefined}
    >
      {active ? (
        isCartReadyToPay ? (
          <PaymentDetails cart={cart} />
        ) : (
          <EmptyState
            title="Cart is not ready to pay"
            description="Please fill out all required fields and try again."
          />
        )
      ) : null}
    </StepWrapper>
  )
}

type PaymentDetailsProps = {
  cart: Cart
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ cart }) => {
  const paymentProviderId =
    cart.payment_collection?.payment_sessions?.[0]?.provider_id

  if (!paymentProviderId) {
    return (
      <EmptyState
        title="No payment method found"
        description="Please select a payment method"
      />
    )
  }

  if (paymentProviderId === PaymentProviderIds.default) {
    return <DefaultPaymentDetails cartId={cart.id} />
  }

  return (
    <EmptyState
      title="Unsupported payment method"
      description="Please select a different payment method or contact support."
    />
  )
}

type DefaultPaymentDetailsProps = {
  cartId: string
}

const DefaultPaymentDetails: React.FC<DefaultPaymentDetailsProps> = ({
  cartId
}) => {
  const navigate = useNavigate()
  const completeCartMutation = useMutation({
    mutationFn: actions.cart.complete,
    mutationKey: ['actions.cart.complete'],
    onSuccess: data => {
      if (data.type === 'order') {
        navigate({
          to: '/order/$id',
          params: { id: data.order.id },
          replace: true
        })
        cartIdStore.remove()
      }
      if (data.type === 'cart') {
        toast.error('Failed to create order', {
          description: data.error.message
        })
      }
    }
  })

  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted-foreground text-sm">
        By clicking the button below, you agree to the{' '}
        <Link
          to="/terms-and-conditions"
          className="hover:text-foreground underline underline-offset-4 transition-colors"
        >
          Terms and Conditions
        </Link>
        .
      </p>
      <Button
        disabled={completeCartMutation.isPending}
        onClick={() => completeCartMutation.mutate({ cartId })}
      >
        {completeCartMutation.isPending && <LoadingCircleIndicator />}
        Buy Now
      </Button>
    </div>
  )
}
