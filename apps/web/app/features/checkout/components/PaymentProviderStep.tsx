import type { Cart } from '@medusa-starter/medusa-utils/models'
import type { CheckoutStep } from '../types'
import { PaymentProviderForm } from './PaymentProviderForm'
import { StepWrapper } from './StepWrapper'

type PaymentStep = Extract<CheckoutStep, 'payment'>

type PaymentStepProps = {
  step: PaymentStep
  isActive: (step: PaymentStep) => boolean
  onSelect: (step: PaymentStep) => void
  onNext: VoidFunction
  isFilled: boolean
  regionId: string
  cart: Cart
}

export const PaymentProviderStep: React.FC<PaymentStepProps> = ({
  step,
  isActive,
  onSelect,
  onNext,
  isFilled,
  regionId,
  cart
}) => {
  const active = isActive(step)

  return (
    <StepWrapper
      title="Payment Method"
      isFilled={isFilled}
      onSelect={() => onSelect(step)}
      isActive={active}
    >
      {active && (
        <PaymentProviderForm
          onNext={onNext}
          regionId={regionId}
          cart={cart}
        />
      )}
    </StepWrapper>
  )
}
