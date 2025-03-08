import { createFileRoute } from '@tanstack/react-router'
import { StorePage } from '~web/features/store/StorePage'
import { actions } from '~web/lib/medusa'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute('/(app)/_layout/store/')({
  component: StorePage,
  loader: async () => {
    return await actions.store.getProducts({
      limit: 5
    })
  },
  head: () => ({
    meta: [...seo({ title: 'Shop' })]
  })
})
