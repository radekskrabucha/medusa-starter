import type { GetMeCustomerParams } from '@medusa-starter/medusa-utils/types'
import { FetchError } from '@medusajs/js-sdk'
import { queryOptions } from '@tanstack/react-query'
import { actions } from '~web/lib/medusa'
import { removeAuthToken } from '../auth/utils'

export const getMeQueryOptions = (
  token: string | null,
  params?: GetMeCustomerParams
) =>
  queryOptions({
    queryKey: ['actions.customer.getMe', params, token],
    queryFn: async () => {
      try {
        return await actions.customer.getMe(params)
      } catch (error) {
        if (error instanceof FetchError) {
          if (error.status === 401) {
            removeAuthToken()
          }
        }

        throw error
      }
    }
  })
