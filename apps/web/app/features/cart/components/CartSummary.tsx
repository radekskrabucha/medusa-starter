import type { Cart } from '@medusa-starter/medusa-utils/models'
import { convertPriceAmountToLocale } from '@medusa-starter/medusa-utils/price'
import { buttonVariants } from '@medusa-starter/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@medusa-starter/ui/card'
import { Separator } from '@medusa-starter/ui/separator'
import { Link } from '@tanstack/react-router'

type CartSummaryProps = {
  cart: Cart
}

export const CartSummary = ({ cart }: CartSummaryProps) => (
  <Card className="h-min">
    <CardHeader>
      <CardTitle>Order Summary</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Subtotal</span>
        <span>
          {convertPriceAmountToLocale({
            amount: cart.subtotal,
            currencyCode: cart.currency_code
          })}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Shipping</span>
        <span>Calculated at checkout</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Tax</span>
        <span>Calculated at checkout</span>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <span className="font-medium">Total</span>
        <span className="font-bold">
          {convertPriceAmountToLocale({
            amount: cart.total,
            currencyCode: cart.currency_code
          })}
        </span>
      </div>
      <Link
        to="/checkout"
        className={buttonVariants({
          size: 'lg',
          className: 'mt-2 w-full'
        })}
      >
        Proceed to Checkout
      </Link>
    </CardContent>
  </Card>
)
