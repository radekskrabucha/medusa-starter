import type { UpdateCartProductParams } from '@medusa-starter/medusa-utils/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { actions } from '~web/lib/medusa'
import { getCartQueryOptions } from '../actions'
import { useSyncLocalCart } from './useSyncCartToken'

type OnChangeQuantityParams<T extends number | undefined> = {
  id: string
  quantity: T extends number
    ? ((currentQuantity: number) => number) | number
    : number
  currentQuantity: T extends number ? number : never
}

export const useChangeProductAmount = () => {
  const cartId = useSyncLocalCart()
  const queryClient = useQueryClient()

  const changeProductAmountMutation = useMutation({
    mutationFn: ({ id, ...req }: Omit<UpdateCartProductParams, 'cartId'>) => {
      if (!cartId) {
        throw new Error('No cart id found')
      }
      return actions.cart.updateProduct({
        cartId,
        id,
        ...req
      })
    },
    mutationKey: ['addProductToCart', cartId],
    onSuccess: data => {
      queryClient.setQueryData(
        getCartQueryOptions({ id: cartId ?? '' }).queryKey,
        data
      )
    }
  })
  const onChangeQuantity = <T extends number | undefined>({
    id,
    quantity,
    currentQuantity
  }: OnChangeQuantityParams<T>) => {
    return changeProductAmountMutation.mutate({
      id,
      body: {
        quantity:
          typeof quantity === 'number' ? quantity : quantity(currentQuantity)
      }
    })
  }

  return {
    changeProductAmountMutation,
    cartId,
    addOne: (id: string, currentQuantity: number) =>
      onChangeQuantity({
        id,
        currentQuantity,
        quantity: currentQuantity => currentQuantity + 1
      }),
    removeOne: (id: string, currentQuantity: number) =>
      onChangeQuantity({
        id,
        quantity: currentQuantity => currentQuantity - 1,
        currentQuantity
      }),
    setQuantity: (id: string, quantity: number) =>
      // @ts-expect-error - we don't pass currentQuantity here
      onChangeQuantity({ id, quantity })
  }
}
