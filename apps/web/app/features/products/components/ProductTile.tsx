import type { Product } from '@medusa-starter/utils/medusa/models'
import { Link } from '@tanstack/react-router'

type ProductTileProps = {
  product: Product
}

export const ProductTile: React.FC<ProductTileProps> = ({
  product: { thumbnail, title, subtitle, handle, variants }
}) => {
  const variant = variants?.[0]

  if (!variant) {
    return null
  }

  const variantPrice = variant?.calculated_price?.calculated_amount ?? 0
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(variantPrice / 100)

  return (
    <Link
      to="/shop/item/$handle"
      params={{
        handle
      }}
      className="flex snap-start flex-col gap-4 rounded-lg border p-4 transition-all hover:shadow-lg"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-md">
        {thumbnail && (
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium">{title}</h3>
        {subtitle && <p className="text-sm font-medium">{subtitle}</p>}
        <p className="text-xl font-bold">{formattedPrice}</p>
      </div>
    </Link>
  )
}
