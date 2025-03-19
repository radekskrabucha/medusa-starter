import type { Cart } from '@medusa-starter/medusa-utils/models'
import { QueryBoundary } from '~web/components/QueryBoundary'
import { useGetMeQuery } from '~web/features/auth/hooks/useGetMeQuery'
import { useSyncCountryId } from '~web/features/regions/hooks/useSyncCountryId'
import type { CheckoutStep } from '../types'
import { AddressForm } from './AddressForm'
import { AddressStepInfo } from './AddressStepInfo'
import { CustomerAddress } from './CustomerAddress'
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
  const { getMeQuery } = useGetMeQuery()
  const countryId = useSyncCountryId()
  const selectedCountry = cart.region?.countries?.find(
    country => country.iso_2 === countryId
  )?.iso_2

  return (
    <StepWrapper
      title="Shipping Address"
      isFilled={isFilled}
      onSelect={() => onSelect(step)}
      isActive={active}
    >
      {active ? (
        <QueryBoundary
          query={getMeQuery}
          errorFallback={() => (
            <AddressForm
              onSuccess={onNext}
              cart={cart}
              selectedCountry={selectedCountry}
            />
          )}
        >
          {data => (
            <CustomerAddress
              onSuccess={onNext}
              cart={cart}
              customer={data.customer}
              isFilled={isFilled}
              selectedCountry={selectedCountry}
            />
          )}
        </QueryBoundary>
      ) : (
        <AddressStepInfo cart={cart} />
      )}
    </StepWrapper>
  )
}
