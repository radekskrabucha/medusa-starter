import type { GetProductsParams } from '@medusa-starter/utils/medusa-actions'
import { queryOptions } from '@tanstack/react-query'
import { actions } from '~web/lib/medusa'

export const getProductsQueryOptions = (params: GetProductsParams) =>
  queryOptions({
    queryKey: ['actions.store.getProducts', params],
    queryFn: () => actions.store.getProducts(params)
  })
