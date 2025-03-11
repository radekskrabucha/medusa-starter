import { createFileRoute } from '@tanstack/react-router'
import { CartLayout } from '~web/layout/cart/CartLayout'

export const Route = createFileRoute('/(checkout)/_layout')({
  component: CartLayout
})
