import type { Cart } from '@medusa-starter/medusa-utils/models'
import { CartLineItem } from './CartLineItem'

type CartItemsProps = {
  cart: Cart
}

export const CartItems = ({ cart }: CartItemsProps) => (
  <div className="flex flex-col gap-6">
    {cart.items?.map(item => (
      <CartLineItem
        key={item.id}
        item={item}
        currencyCode={cart.currency_code}
      />
    ))}
  </div>
)
