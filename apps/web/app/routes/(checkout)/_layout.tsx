import { createFileRoute } from '@tanstack/react-router'
import { CheckoutLayout } from '~web/layout/checkout/CheckoutLayout'

export const Route = createFileRoute('/(checkout)/_layout')({
  component: CheckoutLayout
})
