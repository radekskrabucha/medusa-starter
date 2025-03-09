import { createFileRoute } from '@tanstack/react-router'
import { StorePage } from '~web/features/store/StorePage'
import { LIMIT_PER_PAGE } from '~web/features/store/utils'
import { storeSearchSchema } from '~web/features/store/validationSchemas'
import { actions } from '~web/lib/medusa'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute('/(app)/_layout/store/')({
  validateSearch: storeSearchSchema,
  component: StorePage,
  loaderDeps: ({ search: { order } }) => ({
    order
  }),
  loader: async ({ deps: { order } }) => {
    return await actions.store.getProducts({
      limit: LIMIT_PER_PAGE,
      order: order ?? '-created_at'
    })
  },
  head: () => ({
    meta: [...seo({ title: 'Store' })]
  })
})
