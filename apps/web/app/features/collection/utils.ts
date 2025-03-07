import { getRouteApi } from '@tanstack/react-router'

export const COLLECTIONS_PER_PAGE = 20

export const collectionsPageRouteApi = getRouteApi(
  '/(app)/_layout/collections/'
)

export const collectionPageRouteApi = getRouteApi(
  '/(app)/_layout/collections/$handle'
)
