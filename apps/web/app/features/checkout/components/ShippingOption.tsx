import type { CartShippingOption } from '@medusa-starter/medusa-utils/models'
import { convertPriceAmountToLocale } from '@medusa-starter/medusa-utils/price'
import { Card, CardContent } from '@medusa-starter/ui/components/ui/card'
import { cn } from '@medusa-starter/ui/utils/styles'

type ShippingOptionProps = {
  option: CartShippingOption
  isSelected: boolean
  onSelect: (value: string) => void
}

export const ShippingOption = ({
  option,
  isSelected,
  onSelect
}: ShippingOptionProps) => (
  <label className="cursor-pointer">
    <Card
      className={cn(
        'transition-colors',
        isSelected ? 'border-primary bg-primary/15' : 'hover:border-primary'
      )}
    >
      <input
        type="radio"
        name="shipping-option"
        value={option.id}
        checked={isSelected}
        onChange={() => onSelect(option.id)}
        className="sr-only"
      />
      <CardContent className="flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <div
              className={cn(
                'size-4 rounded-full border transition-colors',
                isSelected
                  ? 'border-primary border-4'
                  : 'border-muted-primary border-2'
              )}
            />
          </div>
          <div className="text-muted-foreground text-sm">
            <p className="text-foreground font-medium">{option.name}</p>
            <p>{option.type.label}</p>
            <p>{option.type.description}</p>
          </div>
        </div>
        <div className="text-foreground shrink-0 text-sm font-medium">
          {option.calculated_price?.calculated_amount != null &&
            option.calculated_price?.currency_code != null && (
              <span>
                {convertPriceAmountToLocale({
                  amount: option.calculated_price.calculated_amount,
                  currencyCode: option.calculated_price.currency_code
                })}
              </span>
            )}
        </div>
      </CardContent>
    </Card>
  </label>
)
