import { buttonVariants } from '@medusa-starter/ui/button'
import { Link } from '@tanstack/react-router'
import { AddressDetails } from './components/AddressDetails'
import { addressDetailsPageRouteApi } from './utils'

export const ShippingAddressDetailsPage = () => {
  const { id } = addressDetailsPageRouteApi.useParams()

  return (
    <section className="layout-section gap-8 !self-start">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-2xl font-semibold">Shipping Address Details</h2>
        <Link
          to="/profile/shipping-address/$id/edit"
          params={{ id }}
          className={buttonVariants({ variant: 'outline' })}
        >
          Edit Address
        </Link>
      </div>
      <AddressDetails id={id} />
    </section>
  )
}
