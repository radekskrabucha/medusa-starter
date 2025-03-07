import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/_layout/shop/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello from shop page</div>
}
