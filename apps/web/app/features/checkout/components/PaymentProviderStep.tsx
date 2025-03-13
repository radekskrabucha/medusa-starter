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
}

export const PaymentProviderStep: React.FC<PaymentStepProps> = ({
  step,
  isActive,
  onSelect,
  onNext,
  isFilled,
  regionId
}) => {
  const active = isActive(step)

  return (
    <StepWrapper
      title="Payment"
      isFilled={isFilled}
      onSelect={() => onSelect(step)}
      isActive={active}
    >
      {active && (
        <PaymentProviderForm
          onNext={onNext}
          regionId={regionId}
        />
      )}
    </StepWrapper>
  )
}
