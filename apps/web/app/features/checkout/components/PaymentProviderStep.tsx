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
  cartId: string
  hasPaymentCollection: boolean
}

export const PaymentProviderStep: React.FC<PaymentStepProps> = ({
  step,
  isActive,
  onSelect,
  onNext,
  isFilled,
  regionId,
  cartId,
  hasPaymentCollection
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
          cartId={cartId}
          hasPaymentCollection={hasPaymentCollection}
        />
      )}
    </StepWrapper>
  )
}
