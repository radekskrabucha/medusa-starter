import { buttonVariants } from '@medusa-starter/ui/button'
import { Link } from '@tanstack/react-router'
import { Addresses } from './components/Addresses'

export const ShippingAddressesPage = () => {
  return (
    <section className="layout-section gap-8 !self-start">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-2xl font-semibold">Shipping Addresses</h2>
        <Link
          to="/profile/shipping-addresses/add"
          className={buttonVariants({ variant: 'outline' })}
        >
          Add Address
        </Link>
      </div>
      <Addresses />
    </section>
  )
}
