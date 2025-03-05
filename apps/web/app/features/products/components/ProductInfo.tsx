import type { Product } from '@medusa-starter/medusa-utils/models'
import { getVariantPrices } from '@medusa-starter/medusa-utils/price'
import { nonNullable } from '@medusa-starter/utils/common'
import type React from 'react'

type ProductInfoProps = {
  product: Product
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const selectedVariant = product?.variants?.[0]

  // TODO: temporary, should be inferred from the selected options
  const variantPrice = nonNullable(selectedVariant)
    ? getVariantPrices(selectedVariant)
    : null

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>
        {product.subtitle && (
          <p className="text-muted-foreground text-base">{product.subtitle}</p>
        )}
        {variantPrice && (
          <p className="mt-4 text-xl font-medium">
            {variantPrice.calculatedPrice.formatted()}
          </p>
        )}
      </div>

      <div>
        <p className="text-muted-foreground text-base">{product.description}</p>
      </div>
    </div>
  )
}
