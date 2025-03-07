import { CollectionProductTile } from './components/CollectionProductTile'
import { collectionPageRouteApi } from './utils'

export const CollectionPage = () => {
  const collection = collectionPageRouteApi.useLoaderData()

  return (
    <section className="layout-section">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">
            {collection.title}
          </h1>
          <p className="text-muted-foreground text-lg">
            Browse our {collection.title} collection
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(calc(100vw-3rem),300px),1fr))] gap-8">
          {collection.products?.map(product => (
            <CollectionProductTile
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
