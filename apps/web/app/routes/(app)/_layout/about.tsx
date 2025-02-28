import { createFileRoute } from '@tanstack/react-router'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute('/(app)/_layout/about')({
  component: RouteComponent,
  head: () => ({
    meta: [...seo({ title: 'About' })]
  })
})

function RouteComponent() {
  return <div>Hello /(app)/_layout/about!</div>
}
