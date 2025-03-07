import { getRouteApi } from '@tanstack/react-router'

export const addressDetailsPageRouteApi = getRouteApi(
  '/(app)/_layout/_authenticated/profile/_layout/shipping-address/$id/'
)

export const editAddressPageRouteApi = getRouteApi(
  '/(app)/_layout/_authenticated/profile/_layout/shipping-address/$id/edit'
)
