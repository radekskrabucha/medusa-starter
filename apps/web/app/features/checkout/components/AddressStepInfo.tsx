import type { Cart } from '@medusa-starter/medusa-utils/models'

type AddressStepInfoProps = {
  cart: Cart
}

export const AddressStepInfo: React.FC<AddressStepInfoProps> = ({ cart }) => (
  <div className="flex flex-col gap-4">
    <h2 className="text-xl font-semibold">Shipping Address</h2>
    <p className="text-muted-foreground text-sm">This is demo email step.</p>
    <p className="text-muted-foreground text-sm">
      {cart.shipping_address?.address_1}
    </p>
  </div>
)
