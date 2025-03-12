import { createFileRoute, notFound } from '@tanstack/react-router'
import { ProductPage } from '~web/features/products/ProductPage'
import { productSearchSchema } from '~web/features/products/validationSchemas'
import { actions } from '~web/lib/medusa'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute('/(app)/_layout/store/item/$handle')({
  component: RouteComponent,
  validateSearch: productSearchSchema,
  loader: async ({ params: { handle } }) => {
    return actions.store
      .getProducts({
        handle,
        fields: '*variants.calculated_price'
      })
      .then(data => {
        const product = data.products[0]

        if (!product) {
          throw notFound()
        }

        return product
      })
  },
  head: ({ loaderData: { title, description } }) => ({
    meta: [...seo({ title, description: description ?? undefined })]
  })
})

function RouteComponent() {
  const product = Route.useLoaderData()

  return <ProductPage product={product} />
}
