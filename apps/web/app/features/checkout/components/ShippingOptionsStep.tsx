import type { Cart } from '@medusa-starter/medusa-utils/models'
import type { CheckoutStep } from '../types'
import { ShippingOptionsWrapper } from './ShippingOptionsWrapper'
import { StepWrapper } from './StepWrapper'

type ShippingStep = Extract<CheckoutStep, 'shipping'>

type ShippingStepProps = {
  step: ShippingStep
  isActive: (step: ShippingStep) => boolean
  onSelect: (step: ShippingStep) => void
  onNext: VoidFunction
  isFilled: boolean
  cart: Cart
}

export const ShippingOptionsStep: React.FC<ShippingStepProps> = ({
  step,
  isActive,
  onSelect,
  onNext,
  isFilled,
  cart
}) => {
  const active = isActive(step)

  return (
    <StepWrapper
      title="Delivery"
      isFilled={isFilled}
      onSelect={() => onSelect(step)}
      isActive={active}
    >
      <ShippingOptionsWrapper
        cartId={cart.id}
        onNext={onNext}
        selectedOptionId={cart.shipping_methods?.[0]?.shipping_option_id}
        active={active}
        isFilled={isFilled}
      />
    </StepWrapper>
  )
}
