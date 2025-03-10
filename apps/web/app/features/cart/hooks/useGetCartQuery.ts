import type { GetCartParams } from '@medusa-starter/medusa-utils/types'
import { useQuery } from '@tanstack/react-query'
import { getCartQueryOptions as getCartOptions } from '../actions'
import { useSyncLocalCart } from './useSyncCartToken'

export const useGetCartQuery = (fields?: GetCartParams['fields']) => {
  const cartId = useSyncLocalCart()
  const getCartQueryOptions = getCartOptions({ id: cartId ?? '', fields })
  const getCartQuery = useQuery(getCartQueryOptions)

  return {
    getCartQuery,
    getCartQueryOptions,
    cartId
  }
}
