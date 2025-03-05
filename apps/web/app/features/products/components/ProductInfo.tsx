import type { Product } from '@medusa-starter/medusa-utils/models'
import type React from 'react'

type ProductInfoProps = {
  product: Product
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  // TODO - Add logic for calculating variant price
  const variantPrice = 1230.12
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(variantPrice)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>
        <p className="mt-4 text-xl font-medium">{formattedPrice}</p>
      </div>

      <div>
        <p className="text-muted-foreground text-base">{product.description}</p>
      </div>
    </div>
  )
}
