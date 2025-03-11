import type { ProductVariant } from '@medusa-starter/medusa-utils/models'
import type React from 'react'
import { CalculateVariantPrice } from './CalculateVariantPrice'

type ProductInfoProps = {
  selectedVariant: ProductVariant
  title: React.ReactNode
  subtitle?: React.ReactNode
  description?: React.ReactNode
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  selectedVariant,
  title,
  subtitle,
  description
}) => (
  <div className="flex flex-col gap-6">
    <div>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {subtitle && (
        <p className="text-muted-foreground text-base">{subtitle}</p>
      )}
      <CalculateVariantPrice variant={selectedVariant}>
        {variantPrice => (
          <p className="mt-4 text-xl font-medium">
            {variantPrice?.calculatedPrice.formatted()}
          </p>
        )}
      </CalculateVariantPrice>
    </div>

    <div>
      <p className="text-muted-foreground text-base">{description}</p>
    </div>
  </div>
)
