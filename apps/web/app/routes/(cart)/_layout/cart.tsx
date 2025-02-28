import { createFileRoute } from '@tanstack/react-router'
import { CartPage } from '~web/features/cart/CartPage'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute('/(cart)/_layout/cart')({
  component: CartPage,
  head: () => ({
    meta: [...seo({ title: 'Cart' })]
  })
})
