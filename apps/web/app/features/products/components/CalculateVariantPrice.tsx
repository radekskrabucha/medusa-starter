import type { ProductVariant } from '@medusa-starter/medusa-utils/models'
import { getVariantPrices } from '@medusa-starter/medusa-utils/price'
import { nonNullable } from '@medusa-starter/utils/common'

type VariantPrices = ReturnType<typeof getVariantPrices>

type CalculateVariantPriceProps = {
  variant: ProductVariant
  children: (prices: VariantPrices, variant: ProductVariant) => React.ReactNode
}

export const CalculateVariantPrice: React.FC<CalculateVariantPriceProps> = ({
  children,
  variant
}) => {
  const variantPrice = nonNullable(variant) ? getVariantPrices(variant) : null

  return children(variantPrice, variant)
}
