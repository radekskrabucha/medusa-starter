import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  addProductToCart,
  getCartQueryOptions,
  type AddProductToCartReq
} from '../actions'
import { useSyncLocalCart } from './useSyncCartToken'

export const useAddProductToCart = (selectedVariantId: string) => {
  const cartId = useSyncLocalCart()
  const queryClient = useQueryClient()

  const addToCartMutation = useMutation({
    mutationFn: (res: AddProductToCartReq) => addProductToCart(cartId, res),
    mutationKey: ['addProductToCart', cartId, selectedVariantId],
    onError: error => {
      toast.error('Failed to add product to cart', {
        description: error.message
      })
    },
    onSuccess: data => {
      toast.success('Product added to cart')

      queryClient.setQueryData(
        getCartQueryOptions({ id: cartId ?? '' }).queryKey,
        data
      )
    }
  })

  return {
    addToCartMutation,
    cartId
  }
}
