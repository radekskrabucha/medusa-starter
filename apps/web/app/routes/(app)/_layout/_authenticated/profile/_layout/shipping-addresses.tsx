import { createFileRoute } from '@tanstack/react-router'
import { ShippingAddressesPage } from '~web/features/profile/ShippingAddressesPage'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute(
  '/(app)/_layout/_authenticated/profile/_layout/shipping-addresses'
)({
  component: ShippingAddressesPage,
  head: () => ({
    meta: [...seo({ title: 'Shipping Addresses' })]
  })
})
