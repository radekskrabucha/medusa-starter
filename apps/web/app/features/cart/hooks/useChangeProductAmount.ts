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

  if (!cartId) {
    throw new Error('No cart id found')
  }

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
    mutationKey: ['actions.cart.updateProduct', cartId],
    onMutate: async ({ id, body }) => {
      await queryClient.cancelQueries(getCartQueryOptions({ id: cartId }))

      const previousCart = queryClient.getQueryData(
        getCartQueryOptions({ id: cartId }).queryKey
      )

      if (previousCart?.cart) {
        queryClient.setQueryData(getCartQueryOptions({ id: cartId }).queryKey, {
          cart: {
            ...previousCart.cart,
            items: previousCart.cart.items?.map(item =>
              item.id === id ? { ...item, quantity: body.quantity } : item
            )
          }
        })
      }

      return { previousCart }
    },
    onError: (_unused_err, _unused_variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(
          getCartQueryOptions({ id: cartId }).queryKey,
          context.previousCart
        )
      }
    },
    onSuccess: data => {
      queryClient.setQueryData(
        getCartQueryOptions({ id: cartId }).queryKey,
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
