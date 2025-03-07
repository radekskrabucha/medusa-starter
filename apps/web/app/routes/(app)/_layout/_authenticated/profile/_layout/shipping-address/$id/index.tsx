import { createFileRoute } from '@tanstack/react-router'
import { ShippingAddressDetailsPage } from '~web/features/profile/ShippingAddressDetailsPage'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute(
  '/(app)/_layout/_authenticated/profile/_layout/shipping-address/$id/'
)({
  component: ShippingAddressDetailsPage,
  head: () => ({
    meta: [...seo({ title: 'Address Details' })]
  })
})
