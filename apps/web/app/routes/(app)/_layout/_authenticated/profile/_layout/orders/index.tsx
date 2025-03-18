import { createFileRoute } from '@tanstack/react-router'
import { OrdersPage } from '~web/features/profile/OrdersPage'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute(
  '/(app)/_layout/_authenticated/profile/_layout/orders/'
)({
  component: OrdersPage,
  head: () => ({
    meta: [...seo({ title: 'Your Orders' })]
  })
})
