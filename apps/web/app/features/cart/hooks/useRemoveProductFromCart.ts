import type { RemoveCartProductParams } from '@medusa-starter/medusa-utils/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { actions } from '~web/lib/medusa'
import { getCartQueryOptions } from '../actions'
import { useSyncLocalCart } from './useSyncCartToken'

export const useRemoveProductFromCart = () => {
  const cartId = useSyncLocalCart()
  const queryClient = useQueryClient()

  const removeProductFromCartMutation = useMutation({
    mutationFn: (req: Omit<RemoveCartProductParams, 'cartId'>) => {
      if (!cartId) {
        throw new Error('No cart id found')
      }

      return actions.cart.removeProduct({
        cartId,
        ...req
      })
    },
    mutationKey: ['actions.cart.removeProduct'],
    onSuccess: data => {
      if (data.parent) {
        queryClient.setQueryData(
          getCartQueryOptions({ id: cartId ?? '' }).queryKey,
          {
            cart: data.parent
          }
        )
      }
    }
  })

  return {
    removeProductFromCartMutation,
    cartId
  }
}
