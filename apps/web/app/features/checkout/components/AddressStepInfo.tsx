import type { Cart } from '@medusa-starter/medusa-utils/models'

type AddressStepInfoProps = {
  cart: Cart
}

export const AddressStepInfo: React.FC<AddressStepInfoProps> = ({ cart }) => (
  <div className="flex flex-row flex-wrap gap-6 @max-2xl:flex-col">
    <InfoColumn
      title="Shipping Address"
      values={[
        cart.shipping_address?.address_1,
        cart.shipping_address?.address_2,
        cart.shipping_address?.city,
        cart.shipping_address?.province,
        cart.shipping_address?.postal_code
      ]}
    />
    <InfoColumn
      title="Billing Address"
      values={[
        cart.billing_address?.address_1,
        cart.billing_address?.address_2,
        cart.billing_address?.city,
        cart.billing_address?.province,
        cart.billing_address?.postal_code
      ]}
    />
    <InfoColumn
      title="Contact"
      values={[cart.email, cart.shipping_address?.phone]}
    />
  </div>
)

type InfoColumnProps = {
  title: React.ReactNode
  values: Array<string | undefined>
}

const InfoColumn: React.FC<InfoColumnProps> = ({ title, values }) => (
  <div className="flex flex-1 shrink-0 flex-col gap-2">
    <h2 className="font-semibold">{title}</h2>
    <div className="text-muted-foreground flex flex-col text-sm">
      {values.map((value, index) => (
        <p key={index}>{value}</p>
      ))}
    </div>
  </div>
)
