import type { Order } from '@medusa-starter/medusa-utils/models'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@medusa-starter/ui/card'
import { getName } from '@medusa-starter/utils/name'

type OrderDetailsProps = {
  order: Order
}

export const OrderDetails = ({ order }: OrderDetailsProps) => {
  return (
    <Card className="@container w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Order Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-6 @max-lg:flex-col">
          <div className="flex flex-1 flex-col gap-2">
            <h3 className="font-medium">Shipping Address</h3>
            {order.shipping_address && (
              <div className="text-muted-foreground text-sm">
                <p>
                  {getName({
                    firstName: order.shipping_address.first_name,
                    lastName: order.shipping_address.last_name
                  })}
                </p>
                <p>{order.shipping_address.address_1}</p>
                {order.shipping_address.address_2 && (
                  <p>{order.shipping_address.address_2}</p>
                )}
                <p>
                  {order.shipping_address.city},{' '}
                  {order.shipping_address.province}{' '}
                  {order.shipping_address.postal_code}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <h3 className="font-medium">Billing Address</h3>
            {order.billing_address && (
              <div className="text-muted-foreground text-sm">
                <p>
                  {getName({
                    firstName: order.billing_address.first_name,
                    lastName: order.billing_address.last_name
                  })}
                </p>
                <p>{order.billing_address.address_1}</p>
                {order.billing_address.address_2 && (
                  <p>{order.billing_address.address_2}</p>
                )}
                <p>
                  {order.billing_address.city}, {order.billing_address.province}{' '}
                  {order.billing_address.postal_code}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
