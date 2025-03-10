import { createFileRoute } from '@tanstack/react-router'
import { StorePage } from '~web/features/store/StorePage'
import { LIMIT_PER_PAGE, SORT_BY_DEFAULT } from '~web/features/store/utils'
import { storeSearchSchema } from '~web/features/store/validationSchemas'
import { actions } from '~web/lib/medusa'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute('/(app)/_layout/store/')({
  validateSearch: storeSearchSchema,
  component: StorePage,
  loaderDeps: ({ search: { order, collections } }) => ({
    order,
    collections
  }),
  loader: async ({ deps: { order } }) => {
    const [productsData, collectionsData, categoriesData] = await Promise.all([
      actions.store.getProducts({
        limit: LIMIT_PER_PAGE,
        order: order ?? SORT_BY_DEFAULT
      }),
      actions.store.getCollections(),
      actions.store.getCategories()
    ])

    return { productsData, collectionsData, categoriesData }
  },
  head: () => ({
    meta: [...seo({ title: 'Store' })]
  })
})
