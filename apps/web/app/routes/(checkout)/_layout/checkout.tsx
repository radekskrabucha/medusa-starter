import { createFileRoute } from '@tanstack/react-router'
import { CheckoutPage } from '~web/features/checkout/CheckoutPage'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute('/(checkout)/_layout/checkout')({
  component: CheckoutPage,
  head: () => ({
    meta: [...seo({ title: 'Checkout' })]
  })
})
