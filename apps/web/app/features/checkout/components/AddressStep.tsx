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
}

export const AddressStep: React.FC<AddressStepProps> = ({
  step,
  cart,
  onSelect,
  onNext,
  isActive
}) => {
  const isFilled =
    Boolean(cart.email) &&
    Boolean(cart.shipping_address) &&
    Boolean(cart.billing_address)
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
          address={cart.shipping_address}
          billingAddress={cart.billing_address}
          cartId={cart.id}
          onSuccess={onNext}
          email={cart.email}
        />
      ) : (
        <AddressStepInfo cart={cart} />
      )}
    </StepWrapper>
  )
}
