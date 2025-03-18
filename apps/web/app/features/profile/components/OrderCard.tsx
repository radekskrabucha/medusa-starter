import type { Order } from '@medusa-starter/medusa-utils/models'
import { convertPriceAmountToLocale } from '@medusa-starter/medusa-utils/price'
import { Badge } from '@medusa-starter/ui/badge'
import { Card, CardContent } from '@medusa-starter/ui/card'
import { Separator } from '@medusa-starter/ui/separator'
import { formatDateTime } from '@medusa-starter/utils/date'
import { fulfillmentStatusMap, paymentStatusMap } from '../utils'

type OrderCardProps = {
  order: Order
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const paymentStatus =
    paymentStatusMap[order.payment_status] ?? paymentStatusMap.not_paid

  const fulfillmentStatus =
    fulfillmentStatusMap[order.fulfillment_status] ??
    fulfillmentStatusMap.not_fulfilled

  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap-reverse items-center justify-between gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <h3 className="font-medium">Order #{order.display_id}</h3>
              <p className="text-muted-foreground text-sm">
                {formatDateTime(order.created_at)}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">Payment:</span>
                <Badge variant={paymentStatus.variant}>
                  {paymentStatus.label}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">
                  Fulfillment:
                </span>
                <Badge variant={fulfillmentStatus.variant}>
                  {fulfillmentStatus.label}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-muted-foreground text-sm">Total Amount</p>
            <p className="text-lg font-bold">
              {convertPriceAmountToLocale({
                amount: order.total,
                currencyCode: order.currency_code
              })}
            </p>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-3">
          {order?.items?.map(item => (
            <ItemCard
              key={item.id}
              item={item}
              currencyCode={order.currency_code}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

type ItemCardProps = {
  item: NonNullable<Order['items']>[number]
  currencyCode: string
}

const ItemCard = ({ item, currencyCode }: ItemCardProps) => (
  <div
    key={item.id}
    className="flex flex-wrap justify-between gap-4"
  >
    <div className="flex flex-col">
      <p className="font-medium">
        {item.product_title}{' '}
        <span className="text-muted-foreground">{item.variant_title}</span>
      </p>
    </div>
    <div className="flex items-center gap-4 text-sm">
      <p className="text-muted-foreground">Quantity: {item.quantity}</p>
      <p>
        {convertPriceAmountToLocale({
          amount: item.total,
          currencyCode
        })}
      </p>
    </div>
  </div>
)
