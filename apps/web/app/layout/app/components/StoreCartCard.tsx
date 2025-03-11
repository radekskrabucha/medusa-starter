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
import { calculateNumOfItems } from '../utils'
import { CartItem } from './CartItem'

type StoreCartCardProps = {
  cart: Cart
}

export const StoreCartCard: React.FC<StoreCartCardProps> = ({ cart }) => (
  <HoverWrapper numOfItems={calculateNumOfItems(cart)}>
    <Separator />
    {cart.items && cart.items.length > 0 ? (
      <div className="flex flex-col gap-3">
        {cart.items.map(item => (
          <CartItem
            key={item.id}
            item={item}
            currencyCode={cart.currency_code}
          />
        ))}
      </div>
    ) : null}
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
  <HoverWrapper numOfItems={0}>
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

type CartIconProps = {
  numOfItems: number
}

const CartIcon: React.FC<CartIconProps> = props => (
  <Link
    to="/cart"
    className={buttonVariants({
      variant: 'ghost',
      size: 'icon',
      className:
        'hover:bg-foreground/5 relative !size-8 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
    })}
    {...props}
  >
    {props.numOfItems ? (
      <NumOfItemsIndicator numOfItems={props.numOfItems} />
    ) : null}
    <ShoppingCart className="size-5" />
  </Link>
)

const CartHeader = () => (
  <div className="text-foreground text-center text-xl font-semibold">
    <span>Shopping Cart</span>
  </div>
)

type HoverWrapperProps = CartIconProps & React.PropsWithChildren

const HoverWrapper: React.FC<HoverWrapperProps> = ({
  children,
  numOfItems
}) => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <CartIcon numOfItems={numOfItems} />
    </HoverCardTrigger>
    <HoverCardContent
      collisionPadding={16}
      className="flex min-w-[min(calc(100vw-2rem),400px)] flex-col gap-4"
    >
      <CartHeader />
      {children}
    </HoverCardContent>
  </HoverCard>
)

const NumOfItemsIndicator: React.FC<CartIconProps> = ({ numOfItems }) => (
  <div className="bg-muted absolute -top-2 left-1/2 flex h-5 min-w-5 shrink-0 items-center justify-center rounded-[300px] px-1 text-xs font-semibold">
    <span>{numOfItems}</span>
  </div>
)
