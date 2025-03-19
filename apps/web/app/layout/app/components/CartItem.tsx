import type { CartItem as CartItemType } from '@medusa-starter/medusa-utils/models'
import { convertPriceAmountToLocale } from '@medusa-starter/medusa-utils/price'
import { Button } from '@medusa-starter/ui/button'
import { Link } from '@tanstack/react-router'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useChangeProductAmount } from '~web/features/cart/hooks/useChangeProductAmount'
import { useRemoveProductFromCart } from '~web/features/cart/hooks/useRemoveProductFromCart'

type CartItemProps = {
  item: CartItemType
  currencyCode: string
}

export const CartItem: React.FC<CartItemProps> = ({ item, currencyCode }) => {
  const {
    addOne,
    removeOne,
    changeProductAmountMutation: { isPending }
  } = useChangeProductAmount()
  const { removeProductFromCartMutation } = useRemoveProductFromCart()
  const removeItem = () => removeProductFromCartMutation.mutate({ id: item.id })

  const disabled = isPending || removeProductFromCartMutation.isPending

  return (
    <div className="flex items-center gap-3">
      <div className="bg-muted relative aspect-square h-16 w-16 shrink-0 overflow-hidden rounded-md">
        {item.thumbnail && (
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between">
          {item.product_handle ? (
            <Link
              to="/store/item/$handle"
              params={{ handle: item.product_handle }}
              className="text-foreground line-clamp-2 text-sm font-medium hover:underline"
            >
              {item.product_title}{' '}
              <span className="text-muted-foreground">({item.title})</span>
            </Link>
          ) : (
            <span className="text-foreground line-clamp-2 text-sm font-medium">
              {item.title}
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-destructive/15 bg-destructive/5 size-6"
            onClick={removeItem}
            disabled={disabled}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-6"
              onClick={() =>
                item.quantity < 2
                  ? removeItem()
                  : removeOne(item.id, item.quantity)
              }
              disabled={disabled}
            >
              <Minus className="size-3" />
            </Button>
            <span className="text-muted-foreground min-w-8 text-center text-sm">
              {item.quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="size-6"
              onClick={() => addOne(item.id, item.quantity)}
              disabled={disabled}
            >
              <Plus className="size-3" />
            </Button>
          </div>
          <span className="text-muted-foreground text-sm">
            {convertPriceAmountToLocale({
              amount: item.unit_price * item.quantity,
              currencyCode
            })}
          </span>
        </div>
      </div>
    </div>
  )
}
