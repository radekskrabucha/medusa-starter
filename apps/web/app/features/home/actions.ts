import type { ListProductsParams } from '@medusa-starter/utils/medusa-actions'
import { queryOptions } from '@tanstack/react-query'
import { actions } from '~web/lib/medusa'

export const listProductsQueryOptions = (params: ListProductsParams) =>
  queryOptions({
    queryKey: ['actions.store.listProducts', params] as const,
    queryFn: () => actions.store.listProducts(params)
  })
