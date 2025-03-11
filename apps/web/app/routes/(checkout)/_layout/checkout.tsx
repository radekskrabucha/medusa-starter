import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(checkout)/_layout/checkout')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello checkout!</div>
}
