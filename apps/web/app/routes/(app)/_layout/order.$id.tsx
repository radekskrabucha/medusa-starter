import { FetchError } from '@medusajs/js-sdk'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { OrderConfirmationPage } from '~web/features/order/OrderConfirmationPage'
import { actions } from '~web/lib/medusa'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute('/(app)/_layout/order/$id')({
  component: OrderConfirmationPage,
  loader: async ({ params }) => {
    try {
      const data = await actions.order.getOrder({ id: params.id })

      return data
    } catch (error) {
      if (error instanceof FetchError) {
        if (error.status === 404) {
          throw notFound()
        }
      }

      throw error
    }
  },
  head: () => ({
    meta: [...seo({ title: 'Order Confirmed' })]
  })
})
