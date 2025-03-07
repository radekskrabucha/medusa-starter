import { createFileRoute, notFound } from '@tanstack/react-router'
import { CollectionPage } from '~web/features/collection/CollectionPage'
import { actions } from '~web/lib/medusa'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute('/(app)/_layout/collections/$handle')({
  component: CollectionPage,
  loader: async ({ params: { handle } }) => {
    const { collections } = await actions.store.getCollections({
      handle,
      fields: 'id,title,handle,*products'
    })

    const collection = collections[0]

    if (!collection) {
      throw notFound()
    }

    return collection
  },
  head: ({ loaderData: { title } }) => ({
    meta: [...seo({ title: `${title} - Collection` })]
  })
})
