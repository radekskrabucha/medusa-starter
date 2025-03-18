import type { Cart } from '@medusa-starter/medusa-utils/models'
import type { CheckoutStep } from '../types'
import { AddressForm } from './AddressForm'
import { AddressStepInfo } from './AddressStepInfo'
import { StepWrapper } from './StepWrapper'

type AddressStep = Extract<CheckoutStep, 'address'>

type AddressStepProps = {
  step: AddressStep
  isActive: (step: AddressStep) => boolean
  cart: Cart
  onSelect: (step: AddressStep) => void
  onNext: VoidFunction
  isFilled: boolean
}

export const AddressStep: React.FC<AddressStepProps> = ({
  step,
  cart,
  onSelect,
  onNext,
  isActive,
  isFilled
}) => {
  const active = isActive(step)

  return (
    <StepWrapper
      title="Shipping Address"
      isFilled={isFilled}
      onSelect={() => onSelect(step)}
      isActive={active}
    >
      {active ? (
        <AddressForm
          onSuccess={onNext}
          cart={cart}
        />
      ) : (
        <AddressStepInfo cart={cart} />
      )}
    </StepWrapper>
  )
}
