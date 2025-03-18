import type {
  GetAddressesParams,
  GetAddressParams,
  GetMeCustomerParams,
  GetOrdersParams
} from '@medusa-starter/medusa-utils/types'
import { getNowUnix } from '@medusa-starter/utils/date'
import { FetchError } from '@medusajs/js-sdk'
import { queryOptions } from '@tanstack/react-query'
import {
  getAuthTokenTimestamps,
  authTokenStorage,
  getIsomorphicAuthCookie
} from '~web/features/auth/utils'
import { actions } from '~web/lib/medusa'

class AuthTokenError extends Error {}

const refreshToken = actions.auth.refreshToken

const TWO_HOURS_IN_SECONDS = 7200
const THIRTY_MINUTES_IN_SECONDS = 1800

export const getMeQueryOptions = (params?: GetMeCustomerParams) =>
  queryOptions({
    queryKey: ['actions.customer.getMe', params],
    queryFn: async () => {
      try {
        const token = getIsomorphicAuthCookie()

        if (!token) {
          throw new AuthTokenError('No auth token found')
        }

        const timestamps = getAuthTokenTimestamps(token)

        if (!timestamps) {
          throw new AuthTokenError('Invalid auth token')
        }
        const nowUnix = getNowUnix()

        if (nowUnix > timestamps.exp) {
          throw new AuthTokenError('Auth token expired')
        }

        const difference = timestamps.difference()

        // If the difference is less than two hours and the token will expire in less than 30 minutes, refresh the token
        if (
          difference <= TWO_HOURS_IN_SECONDS &&
          nowUnix - timestamps.exp < THIRTY_MINUTES_IN_SECONDS
        ) {
          await refreshToken()
        }
        // If the difference is more than two hours, refresh the token if the token was issued more than two hours ago
        if (nowUnix - timestamps.iat > TWO_HOURS_IN_SECONDS) {
          await refreshToken()
        }

        const getMeRes = await actions.customer.getMe(params, token)

        return getMeRes
      } catch (error) {
        if (error instanceof FetchError) {
          if (error.status === 401) {
            authTokenStorage.remove()
          }
        }
        if (error instanceof AuthTokenError) {
          authTokenStorage.remove()
        }

        throw error
      }
    }
  })

export const getAddressesQueryOptions = (params: GetAddressesParams) =>
  queryOptions({
    queryKey: ['actions.customer.address.getAddresses', params],
    queryFn: () => actions.customer.address.getAddresses(params)
  })

export const getAddressQueryOptions = (params: GetAddressParams) =>
  queryOptions({
    queryKey: ['actions.customer.address.getAddress', params],
    queryFn: () => actions.customer.address.getAddress(params)
  })

export const getOrdersQueryOptions = (params?: GetOrdersParams) =>
  queryOptions({
    queryKey: ['actions.order.getOrders', params],
    queryFn: () => actions.order.getOrders(params)
  })
