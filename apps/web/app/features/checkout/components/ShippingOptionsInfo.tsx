import type { CartShippingOption } from '@medusa-starter/medusa-utils/models'
import { convertPriceAmountToLocale } from '@medusa-starter/medusa-utils/price'

type ShippingOptionsInfoProps = {
  shippingOption: CartShippingOption
}

export const ShippingOptionsInfo: React.FC<ShippingOptionsInfoProps> = ({
  shippingOption
}) => {
  const price =
    shippingOption.calculated_price?.calculated_amount &&
    shippingOption.calculated_price?.currency_code
      ? convertPriceAmountToLocale({
          amount: shippingOption.calculated_price.calculated_amount,
          currencyCode: shippingOption.calculated_price.currency_code
        })
      : null

  return (
    <div className="flex flex-1 shrink-0 flex-col gap-2">
      <h2 className="font-semibold">
        {shippingOption.name}{' '}
        {price && <span className="text-muted-foreground">{price}</span>}
      </h2>
      <div className="text-muted-foreground flex flex-col text-sm">
        <p>{shippingOption.type.label}</p>
        <p>{shippingOption.type.description}</p>
      </div>
    </div>
  )
}
