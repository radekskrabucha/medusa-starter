import { type Collection } from '@medusa-starter/medusa-utils/models'
import { Card, CardContent, CardFooter } from '@medusa-starter/ui/card'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

type CollectionSummaryTileProps = {
  collection: Collection
}

export const CollectionSummaryTile: React.FC<CollectionSummaryTileProps> = ({
  collection
}) => {
  const thumbnail1 = collection.products?.[0]?.thumbnail
  const thumbnail2 = collection.products?.[1]?.thumbnail

  return (
    <Link
      to="/collections/$handle"
      params={{ handle: collection.handle }}
    >
      <Card className="group pt-0">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-sm">
          {thumbnail1 && (
            <>
              <img
                src={thumbnail1}
                alt="collection image"
                className="absolute top-1/2 left-0 w-full translate-x-0 -translate-y-1/2 object-fill object-center transition-transform duration-300 group-hover:-translate-x-full"
                loading="lazy"
              />
              {thumbnail2 && (
                <img
                  src={thumbnail2}
                  alt="collection image"
                  className="absolute top-1/2 left-0 w-full translate-x-full -translate-y-1/2 object-fill object-center transition-transform duration-300 group-hover:translate-x-0"
                  loading="lazy"
                />
              )}
            </>
          )}
        </div>
        <CardContent>
          <h3 className="line-clamp-1 font-medium">{collection.title}</h3>
        </CardContent>
        <CardFooter className="text-muted-foreground justify-end gap-2 text-sm">
          See collection
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </CardFooter>
      </Card>
    </Link>
  )
}
