import { Button } from '@medusa-starter/ui/button'
import { ShoppingCart } from 'lucide-react'

// TOOD - Add logic for adding product to cart
export const ProductAddToCartButton = () => {
  return (
    <Button onClick={() => alert('Add to cart')}>
      <ShoppingCart className="size-5" />
      Add to Cart
    </Button>
  )
}
