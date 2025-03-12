import { Card, CardContent } from '@medusa-starter/ui/card'
import type { Product } from '@medusa-starter/utils/medusa/models'
import { Link } from '@tanstack/react-router'
import { CalculateVariantPrice } from './CalculateVariantPrice'

type ProductTileProps = {
  product: Product
}

export const ProductTile: React.FC<ProductTileProps> = ({
  product: { thumbnail, title, handle, variants }
}) => {
  const variant = variants?.[0]

  if (!variant) {
    return null
  }

  return (
    <Link
      to="/store/item/$handle"
      params={{
        handle
      }}
    >
      <Card className="group snap-start overflow-hidden pt-0">
        <div className="relative aspect-square w-full overflow-hidden rounded-b-xl shadow-sm">
          {thumbnail && (
            <img
              src={thumbnail}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>
        <CardContent className="flex flex-col gap-2 pt-4">
          <h3 className="line-clamp-2 text-lg font-medium">{title}</h3>
          <CalculateVariantPrice variant={variant}>
            {variantPrice => (
              <p className="text-xl font-bold">
                {variantPrice?.calculatedPrice.formatted()}
              </p>
            )}
          </CalculateVariantPrice>
        </CardContent>
      </Card>
    </Link>
  )
}
