import type { Cart } from '@medusa-starter/medusa-utils/models'
import { convertPriceAmountToLocale } from '@medusa-starter/medusa-utils/price'
import { Card, CardContent, CardHeader } from '@medusa-starter/ui/card'
import { Separator } from '@medusa-starter/ui/separator'
import { cn } from '@medusa-starter/ui/utils/styles'
import { Link } from '@tanstack/react-router'

type OrderSummaryProps = {
  cart: Cart
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ cart }) => (
  <Card className="h-min">
    <CardHeader>
      <h2 className="text-2xl font-semibold">Order Summary</h2>
    </CardHeader>
    <CardContent className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {cart.items?.map(item => (
          <ProductItem
            key={item.id}
            handle={item.product_handle ?? ''}
            title={item.title}
            productTitle={item.product_title}
            thumbnail={item.thumbnail}
            quantity={item.quantity}
            unitPrice={item.unit_price}
            currencyCode={cart.currency_code}
          />
        ))}
      </div>

      <Separator />

      <div className="flex flex-col gap-2">
        <PriceRow
          label="Subtotal"
          amount={cart.item_total}
          currencyCode={cart.currency_code}
        />
        <PriceRow
          label="Shipping"
          amount={cart.shipping_total}
          currencyCode={cart.currency_code}
        />
        <PriceRow
          label="Includes Tax"
          amount={cart.tax_total}
          currencyCode={cart.currency_code}
        />
      </div>

      <Separator />

      <PriceRow
        label="Total"
        amount={cart.total}
        currencyCode={cart.currency_code}
        className="text-base font-bold"
      />
    </CardContent>
  </Card>
)

type ProductItemProps = {
  handle: string
  title: string
  productTitle: string | undefined
  thumbnail: string | undefined
  quantity: number
  unitPrice: number
  currencyCode: string
}

const ProductItem: React.FC<ProductItemProps> = ({
  handle,
  title,
  productTitle,
  thumbnail,
  quantity,
  unitPrice,
  currencyCode
}) => (
  <Link
    to="/store/item/$handle"
    params={{ handle }}
    className="group flex items-start gap-3"
  >
    <div className="bg-muted relative aspect-square size-16 shrink-0 overflow-hidden rounded-md">
      {thumbnail && (
        <img
          src={thumbnail}
          alt={productTitle ?? title}
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
        />
      )}
    </div>
    <div className="flex flex-1 items-center justify-between gap-2">
      <div className="text-muted-foreground flex-1 text-sm">
        {productTitle && (
          <p className="text-foreground line-clamp-1 font-medium">
            {productTitle}
          </p>
        )}
        <p className="line-clamp-1">{title}</p>
        <p className="line-clamp-1">Quantity: {quantity}</p>
      </div>
      <p className="text-sm font-medium whitespace-nowrap">
        {convertPriceAmountToLocale({
          amount: unitPrice * quantity,
          currencyCode: currencyCode
        })}
      </p>
    </div>
  </Link>
)

type PriceRowProps = {
  label: React.ReactNode
  amount: number
  currencyCode: string
  className?: string
}

const PriceRow: React.FC<PriceRowProps> = ({
  label,
  amount,
  currencyCode,
  className
}) => (
  <div
    className={cn(
      'text-muted-foreground flex items-center justify-between text-sm',
      className
    )}
  >
    <span>{label}</span>
    <span className="text-right">
      {convertPriceAmountToLocale({
        amount,
        currencyCode
      })}
    </span>
  </div>
)
