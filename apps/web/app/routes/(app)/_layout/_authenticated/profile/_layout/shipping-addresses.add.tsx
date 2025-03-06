import { createFileRoute } from '@tanstack/react-router'
import { AddShippingAddressPage } from '~web/features/profile/AddShippingAddressPage'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute(
  '/(app)/_layout/_authenticated/profile/_layout/shipping-addresses/add'
)({
  component: AddShippingAddressPage,
  head: () => ({
    meta: [...seo({ title: 'Add Shipping Address' })]
  })
})
