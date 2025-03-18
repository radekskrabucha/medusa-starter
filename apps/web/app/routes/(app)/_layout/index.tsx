import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '~web/features/home/HomePage'
import { FEATURED_PRODUCTS_LIMIT } from '~web/features/home/utils'
import { actions } from '~web/lib/medusa'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute('/(app)/_layout/')({
  component: HomePage,
  loader: async () => {
    return await actions.store.getProducts({
      limit: FEATURED_PRODUCTS_LIMIT,
      fields: '*variants.calculated_price'
    })
  },
  head: () => ({
    meta: [...seo({ title: 'Home' })]
  })
})
