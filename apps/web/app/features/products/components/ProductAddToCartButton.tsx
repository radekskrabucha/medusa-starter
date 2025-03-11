import type { ProductVariant } from '@medusa-starter/medusa-utils/models'
import { Button } from '@medusa-starter/ui/button'
import { LoadingCircleIndicator } from '@medusa-starter/ui/loading-circle-indicator'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ShoppingCart } from 'lucide-react'
import type React from 'react'
import { toast } from 'sonner'
import {
  addProductToCart,
  getCartQueryOptions,
  type AddProductToCartReq
} from '~web/features/cart/actions'
import { useSyncLocalCart } from '~web/features/cart/hooks/useSyncCartToken'

type ProductAddToCartButtonProps = {
  selectedVariant: ProductVariant
}

export const ProductAddToCartButton: React.FC<ProductAddToCartButtonProps> = ({
  selectedVariant
}) => {
  const cartId = useSyncLocalCart()
  const queryClient = useQueryClient()

  const addToCartMutation = useMutation({
    mutationFn: (res: AddProductToCartReq) => addProductToCart(cartId, res),
    mutationKey: ['addProductToCart', cartId, selectedVariant.id],
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

  return (
    <Button
      onClick={() =>
        addToCartMutation.mutate({
          quantity: 1,
          variant_id: selectedVariant.id
        })
      }
      disabled={addToCartMutation.isPending}
    >
      {addToCartMutation.isPending && <LoadingCircleIndicator />}
      <ShoppingCart className="size-5" />
      Add to Cart
    </Button>
  )
}
