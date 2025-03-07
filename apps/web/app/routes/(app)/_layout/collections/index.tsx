import { createFileRoute } from '@tanstack/react-router'
import { CollectionsPage } from '~web/features/collection/CollectionsPage'
import { COLLECTIONS_PER_PAGE } from '~web/features/collection/utils'
import { actions } from '~web/lib/medusa'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute('/(app)/_layout/collections/')({
  component: CollectionsPage,
  loader: async () => {
    return await actions.store.getCollections({ limit: COLLECTIONS_PER_PAGE })
  },
  head: () => ({
    meta: [...seo({ title: 'Collections' })]
  })
})
