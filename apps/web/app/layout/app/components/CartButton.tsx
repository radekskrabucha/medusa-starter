import { buttonVariants } from '@medusa-starter/ui/button'
import { Link } from '@tanstack/react-router'
import { ShoppingCart } from 'lucide-react'

export const CartButton = () => (
  <Link
    to="/cart"
    className={buttonVariants({
      variant: 'ghost',
      size: 'icon',
      className: 'hover:bg-foreground/5 !size-8'
    })}
  >
    <ShoppingCart className="size-5" />
  </Link>
)
