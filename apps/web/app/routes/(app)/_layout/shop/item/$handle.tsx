import { createFileRoute, notFound } from '@tanstack/react-router'
import { ProductPage } from '~web/features/products/ProductPage'
import { actions } from '~web/lib/medusa'

export const Route = createFileRoute('/(app)/_layout/shop/item/$handle')({
  component: RouteComponent,
  loader: async ({ params: { handle } }) => {
    return actions.store
      .getProducts({
        handle
      })
      .then(data => {
        const product = data.products[0]

        if (!product) {
          throw notFound()
        }

        return product
      })
  }
})

function RouteComponent() {
  const product = Route.useLoaderData()

  return <ProductPage product={product} />
}
