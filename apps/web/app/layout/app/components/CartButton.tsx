import { ShoppingCart } from 'lucide-react'

export const CartButton = () => (
  <button className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
    <ShoppingCart className="size-5" />
  </button>
)
