import { createFileRoute } from '@tanstack/react-router'
import { StorePage } from '~web/features/store/StorePage'
import {
  LIMIT_PER_PAGE,
  SORT_BY_DEFAULT,
  getIdsFromHandles
} from '~web/features/store/utils'
import { storeSearchSchema } from '~web/features/store/validationSchemas'
import { actions } from '~web/lib/medusa'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute('/(app)/_layout/store/')({
  validateSearch: storeSearchSchema,
  component: StorePage,
  loaderDeps: ({ search: { order, collections, categories, page } }) => ({
    order,
    collections,
    categories,
    page
  }),
  loader: async ({ deps: { order, collections, categories, page } }) => {
    const [collectionsData, categoriesData] = await Promise.all([
      actions.store.getCollections(),
      actions.store.getCategories()
    ])

    const collectionIds = getIdsFromHandles(
      collections,
      collectionsData.collections
    )
    const categoriesIds = getIdsFromHandles(
      categories,
      categoriesData.product_categories
    )

    const productsData = await actions.store.getProducts({
      limit: LIMIT_PER_PAGE,
      order: order ?? SORT_BY_DEFAULT,
      collection_id: collectionIds ? collectionIds.join(',') : undefined,
      category_id: categoriesIds?.join(','),
      offset: page ? (page - 1) * LIMIT_PER_PAGE : undefined
    })

    return { productsData, collectionsData, categoriesData }
  },
  head: () => ({
    meta: [...seo({ title: 'Store' })]
  })
})
