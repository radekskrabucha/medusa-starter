import type { Cart } from '@medusa-starter/medusa-utils/models'
import { convertPriceAmountToLocale } from '@medusa-starter/medusa-utils/price'
import { buttonVariants } from '@medusa-starter/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@medusa-starter/ui/hover-card'
import { Label } from '@medusa-starter/ui/label'
import { Separator } from '@medusa-starter/ui/separator'
import { Link } from '@tanstack/react-router'
import { ShoppingCart } from 'lucide-react'
import { EmptyState } from '~web/components/EmptyState'

type StoreCartCardProps = {
  cart: Cart
}

export const StoreCartCard: React.FC<StoreCartCardProps> = ({ cart }) => (
  <HoverWrapper>
    <Separator />
    <div className="flex items-center justify-between gap-2">
      <Label>Total</Label>
      <span className="text-muted-foreground text-sm">
        {convertPriceAmountToLocale({
          amount: cart.total,
          currencyCode: cart.currency_code
        })}
      </span>
    </div>
    <Link
      to="/cart"
      className={buttonVariants({})}
    >
      <ShoppingCart className="size-5" />
      <span>Go To Cart</span>
    </Link>
  </HoverWrapper>
)

export const StoreEmptyCartCard = () => (
  <HoverWrapper>
    <Separator />
    <EmptyState
      className="border-0 bg-transparent shadow-none"
      title="Your cart is empty"
      description="You haven't added any products to your cart yet."
      action={
        <Link
          to="/store"
          replace
          className={buttonVariants({})}
        >
          Explore products
        </Link>
      }
      icon={ShoppingCart}
    />
  </HoverWrapper>
)

const CartIcon: React.FC<React.ComponentProps<typeof Link>> = props => (
  <Link
    to="/cart"
    className={buttonVariants({
      variant: 'ghost',
      size: 'icon',
      className:
        'hover:bg-foreground/5 !size-8 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
    })}
    {...props}
  >
    <ShoppingCart className="size-5" />
  </Link>
)

const CartHeader = () => (
  <div className="text-foreground text-center text-xl font-semibold">
    <span>Shopping Cart</span>
  </div>
)

const HoverWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <CartIcon />
    </HoverCardTrigger>
    <HoverCardContent
      collisionPadding={16}
      className="flex min-w-[min(calc(100vw-2rem),400px)] flex-col gap-2"
    >
      <CartHeader />
      {children}
    </HoverCardContent>
  </HoverCard>
)
