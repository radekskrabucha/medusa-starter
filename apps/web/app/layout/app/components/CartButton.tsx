import { Link } from '@tanstack/react-router'
import { ShoppingCart } from 'lucide-react'

export const CartButton = () => (
  <Link
    to="/cart"
    className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
  >
    <ShoppingCart className="size-5" />
  </Link>
)
