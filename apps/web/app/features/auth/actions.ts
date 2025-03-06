import type { GetMeCustomerParams } from '@medusa-starter/medusa-utils/types'
import { queryOptions } from '@tanstack/react-query'
import { actions, AUTH_TOKEN_KEY } from '~web/lib/medusa'

export const getMeQueryOptions = (
  token: string | null,
  params?: GetMeCustomerParams
) =>
  queryOptions({
    queryKey: ['actions.customer.getMe', params, token],
    queryFn: () => actions.customer.getMe(params)
  })

export const LOG_IN_EVENT_NAME = 'storage'
export const logOut = () => {
  window.localStorage.removeItem(AUTH_TOKEN_KEY)
  window.dispatchEvent(new Event(LOG_IN_EVENT_NAME))
}

export const onLogIn = () => {
  window.dispatchEvent(new Event(LOG_IN_EVENT_NAME))
}
