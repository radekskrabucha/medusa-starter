import type { CartItem } from '@medusa-starter/medusa-utils/models'
import { convertPriceAmountToLocale } from '@medusa-starter/medusa-utils/price'
import { Button } from '@medusa-starter/ui/button'
import { Card, CardContent } from '@medusa-starter/ui/card'
import { Link } from '@tanstack/react-router'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useChangeProductAmount } from '../hooks/useChangeProductAmount'
import { useRemoveProductFromCart } from '../hooks/useRemoveProductFromCart'

type CartLineItemProps = {
  item: CartItem
  currencyCode: string
}

export const CartLineItem = ({ item, currencyCode }: CartLineItemProps) => {
  const {
    addOne,
    removeOne,
    changeProductAmountMutation: { isPending }
  } = useChangeProductAmount()
  const { removeProductFromCartMutation } = useRemoveProductFromCart()
  const removeItem = () => removeProductFromCartMutation.mutate({ id: item.id })

  const disabled = isPending || removeProductFromCartMutation.isPending

  return (
    <Card>
      <CardContent className="flex items-start gap-4">
        <div className="bg-muted relative aspect-square size-24 shrink-0 overflow-hidden rounded-md max-sm:size-16">
          {item.thumbnail && (
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col">
              {item.product_handle ? (
                <Link
                  to="/store/item/$handle"
                  params={{ handle: item.product_handle }}
                  className="text-foreground line-clamp-2 text-base font-medium hover:underline"
                >
                  {item.product_title}
                </Link>
              ) : (
                <span className="text-foreground line-clamp-2 text-lg font-medium">
                  {item.title}
                </span>
              )}
              <span className="text-muted-foreground text-sm">
                {item.title}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-destructive/15 bg-destructive/5 size-8"
              onClick={removeItem}
              disabled={disabled}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() =>
                  item.quantity < 2
                    ? removeItem()
                    : removeOne(item.id, item.quantity)
                }
                disabled={disabled}
              >
                <Minus className="size-4" />
              </Button>
              <span className="text-muted-foreground min-w-10 text-center text-sm">
                {item.quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => addOne(item.id, item.quantity)}
                disabled={disabled}
              >
                <Plus className="size-4" />
              </Button>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-foreground font-medium">
                {convertPriceAmountToLocale({
                  amount: item.unit_price * item.quantity,
                  currencyCode
                })}
              </span>
              {item.quantity > 1 && (
                <span className="text-muted-foreground text-sm">
                  {convertPriceAmountToLocale({
                    amount: item.unit_price,
                    currencyCode
                  })}{' '}
                  each
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
