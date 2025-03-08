import { Card, CardContent } from '@medusa-starter/ui/card'
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
      to="/store/item/$handle"
      params={{
        handle
      }}
    >
      <Card className="group overflow-hidden pt-0">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-sm">
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
          {subtitle && (
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {subtitle}
            </p>
          )}
          <p className="text-xl font-bold">{formattedPrice}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
