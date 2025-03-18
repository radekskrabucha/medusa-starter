import { createFileRoute } from '@tanstack/react-router'
import { getCartQueryOptions } from '~web/features/cart/actions'
import { getIsomorphicCartCookie } from '~web/features/cart/utils'
import { getMeQueryOptions } from '~web/features/profile/actions'
import { AppLayout } from '~web/layout/app/AppLayout'
import { actions } from '~web/lib/medusa'

export const Route = createFileRoute('/(app)/_layout')({
  component: AppLayout,
  preload: true,
  loader: async ({ context: { queryClient } }) => {
    await Promise.all([
      queryClient.prefetchQuery(getMeQueryOptions()),
      queryClient.prefetchQuery(
        getCartQueryOptions({ id: getIsomorphicCartCookie() ?? '' })
      )
    ])

    const [regionsData, collectionsData, categoriesData] = await Promise.all([
      actions.region.getRegions(),
      actions.store.getCollections({ limit: 5 }),
      actions.store.getCategories({ limit: 5 })
    ])

    return {
      regionsData,
      collectionsData,
      categoriesData
    }
  }
})
