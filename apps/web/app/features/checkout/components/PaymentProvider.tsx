import {
  PaymentProviderIds,
  type PaymentProviderID
} from '@medusa-starter/medusa-utils/payment'
import { Card, CardContent } from '@medusa-starter/ui/card'
import type { StringWithAutoCompleteOptions } from '@medusa-starter/utils/types'
import { cx } from 'class-variance-authority'

type ProviderId = StringWithAutoCompleteOptions<PaymentProviderID>
type PaymentProviderProps = {
  providerId: ProviderId
} & PaymentProviderWrapperProps

export const PaymentProvider: React.FC<PaymentProviderProps> = ({
  providerId,
  isSelected,
  onSelect
}) => {
  if (providerId === PaymentProviderIds.default) {
    return (
      <DefaultPaymentProvider
        isSelected={isSelected}
        onSelect={onSelect}
      />
    )
  }

  return null
}

const DefaultPaymentProvider: React.FC<PaymentProviderWrapperProps> = ({
  isSelected,
  onSelect
}) => (
  <PaymentProviderWrapper
    isSelected={isSelected}
    onSelect={onSelect}
  >
    <div>
      <h3 className="text-xl font-semibold">Default Payment Provider</h3>
      <p className="text-muted-foreground text-sm">
        This is demo payment provider.
      </p>
    </div>
  </PaymentProviderWrapper>
)

type PaymentProviderWrapperProps = {
  isSelected: boolean
  onSelect: VoidFunction
}

export const PaymentProviderWrapper: React.FC<
  React.PropsWithChildren<PaymentProviderWrapperProps>
> = ({ isSelected, children, onSelect }) => (
  <button
    className="cursor-pointer text-left"
    onClick={() => onSelect()}
  >
    <Card
      className={cx(
        'transition-colors',
        isSelected ? 'border-primary bg-primary/15' : 'hover:border-primary'
      )}
    >
      <CardContent className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <div
            className={cx(
              'size-4 rounded-full border transition-colors',
              isSelected
                ? 'border-primary border-4'
                : 'border-muted-primary border-2'
            )}
          />
        </div>
        {children}
      </CardContent>
    </Card>
  </button>
)
