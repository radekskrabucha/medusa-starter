import type { GetCartShippingOptionsParams } from '@medusa-starter/medusa-utils/types'
import { queryOptions } from '@tanstack/react-query'
import { actions } from '~web/lib/medusa'

export const getShippingMethodsQueryOptions = (
  params: GetCartShippingOptionsParams
) =>
  queryOptions({
    queryFn: () => actions.fulfillment.getCartShippingOptions(params),
    queryKey: ['actions.fulfillment.getCartShippingOptions', params]
  })
