import type { Order } from '@medusa-starter/medusa-utils/models'
import { convertPriceAmountToLocale } from '@medusa-starter/medusa-utils/price'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@medusa-starter/ui/card'
import { Separator } from '@medusa-starter/ui/separator'

type OrderSummaryProps = {
  order: Order
}

export const OrderSummary = ({ order }: OrderSummaryProps) => {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {order.items?.map(item => (
          <div
            key={item.id}
            className="flex items-center gap-4"
          >
            {item.thumbnail && (
              <div className="bg-muted relative aspect-square size-16 shrink-0 overflow-hidden rounded-md">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <p className="font-medium">{item.product_title}</p>
              <p className="text-muted-foreground text-sm">
                {item.variant_title}
              </p>
              <p className="text-muted-foreground text-sm">
                Quantity: {item.quantity}
              </p>
            </div>
            <p className="font-medium">
              {convertPriceAmountToLocale({
                amount: item.unit_price,
                currencyCode: order.currency_code
              })}
            </p>
          </div>
        ))}

        <Separator className="" />

        <div className="flex flex-col gap-2">
          <div className="flex justify-between gap-2 text-sm">
            <span>Subtotal</span>
            <span>
              {convertPriceAmountToLocale({
                amount: order.item_total,
                currencyCode: order.currency_code
              })}
            </span>
          </div>
          <div className="flex justify-between gap-2 text-sm">
            <span>Shipping</span>
            <span>
              {convertPriceAmountToLocale({
                amount: order.shipping_total,
                currencyCode: order.currency_code
              })}
            </span>
          </div>
          {order.tax_total > 0 && (
            <div className="flex justify-between gap-2 text-sm">
              <span>Tax included</span>
              <span>
                {convertPriceAmountToLocale({
                  amount: order.tax_total,
                  currencyCode: order.currency_code
                })}
              </span>
            </div>
          )}
        </div>

        <Separator className="" />

        <div className="flex flex-col gap-2">
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>
              {convertPriceAmountToLocale({
                amount: order.total,
                currencyCode: order.currency_code
              })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
