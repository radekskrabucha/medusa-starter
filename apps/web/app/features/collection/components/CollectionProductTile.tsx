import { Card, CardContent, CardFooter } from '@medusa-starter/ui/card'
import type { Product } from '@medusa-starter/utils/medusa/models'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

type CollectionProductTileProps = {
  product: Product
}

export const CollectionProductTile: React.FC<CollectionProductTileProps> = ({
  product: { thumbnail, title, handle, description }
}) => (
  <Link
    to="/store/item/$handle"
    params={{
      handle
    }}
  >
    <Card className="group overflow-hidden pt-0">
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
        <h3 className="line-clamp-1 text-lg font-medium">{title}</h3>
        {description && (
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {description}
          </p>
        )}
      </CardContent>
      <CardFooter className="text-muted-foreground justify-end gap-2 text-sm">
        See product details
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </CardFooter>
    </Card>
  </Link>
)
