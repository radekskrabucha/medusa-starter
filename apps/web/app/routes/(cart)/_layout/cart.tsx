import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(cart)/_layout/cart')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello from cart layout</div>
}
