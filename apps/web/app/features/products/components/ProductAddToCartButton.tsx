import type { ProductVariant } from '@medusa-starter/medusa-utils/models'
import { Button } from '@medusa-starter/ui/button'
import { LoadingCircleIndicator } from '@medusa-starter/ui/loading-circle-indicator'
import { ShoppingCart } from 'lucide-react'
import type React from 'react'
import { useAddProductToCart } from '~web/features/cart/hooks/useAddProductToCart'

type ProductAddToCartButtonProps = {
  selectedVariant: ProductVariant
}

export const ProductAddToCartButton: React.FC<ProductAddToCartButtonProps> = ({
  selectedVariant
}) => {
  const { addToCartMutation } = useAddProductToCart(selectedVariant.id)

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
