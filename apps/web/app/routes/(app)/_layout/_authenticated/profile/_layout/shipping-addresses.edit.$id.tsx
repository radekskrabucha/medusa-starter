import { createFileRoute } from '@tanstack/react-router'
import { EditShippingAddressPage } from '~web/features/profile/EditShippingAddressPage'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute(
  '/(app)/_layout/_authenticated/profile/_layout/shipping-addresses/edit/$id'
)({
  component: EditShippingAddressPage,
  head: () => ({
    meta: [...seo({ title: 'Edit Shipping Address' })]
  })
})
