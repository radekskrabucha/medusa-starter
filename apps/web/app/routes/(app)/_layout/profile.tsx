import { createFileRoute } from '@tanstack/react-router'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute('/(app)/_layout/profile')({
  component: RouteComponent,
  head: () => ({
    meta: [...seo({ title: 'Profile' })]
  })
})

function RouteComponent() {
  return <div>Hello /(app)/_layout/profile!</div>
}
