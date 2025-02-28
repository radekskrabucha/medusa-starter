import { createFileRoute } from '@tanstack/react-router'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute('/(cart)/_layout/cart')({
  component: RouteComponent,
  head: () => ({
    meta: [...seo({ title: 'Cart' })]
  })
})

function RouteComponent() {
  return <div>Hello from cart layout</div>
}
