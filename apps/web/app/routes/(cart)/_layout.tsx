import { createFileRoute } from '@tanstack/react-router'
import { CartLayout } from '~web/layout/cart/CartLayout'

export const Route = createFileRoute('/(cart)/_layout')({
  component: CartLayout
})
