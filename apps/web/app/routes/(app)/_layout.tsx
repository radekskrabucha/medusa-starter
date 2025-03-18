import { createFileRoute } from '@tanstack/react-router'
import { getMeQueryOptions } from '~web/features/profile/actions'
import { AppLayout } from '~web/layout/app/AppLayout'
import { actions } from '~web/lib/medusa'

export const Route = createFileRoute('/(app)/_layout')({
  component: AppLayout,
  preload: true,
  loader: async ({ context: { queryClient } }) => {
    await queryClient.prefetchQuery(getMeQueryOptions())

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
