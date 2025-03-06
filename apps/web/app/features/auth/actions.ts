import type { GetMeCustomerParams } from '@medusa-starter/medusa-utils/types'
import { queryOptions } from '@tanstack/react-query'
import { actions } from '~web/lib/medusa'

export const getMeQueryOptions = (
  token: string | null,
  params?: GetMeCustomerParams
) =>
  queryOptions({
    queryKey: ['actions.customer.getMe', params, token],
    queryFn: () => actions.customer.getMe(params)
  })
