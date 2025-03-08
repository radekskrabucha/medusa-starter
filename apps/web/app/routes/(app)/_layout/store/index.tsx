import { createFileRoute } from '@tanstack/react-router'
import { actions } from '~web/lib/medusa'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute('/(app)/_layout/store/')({
  component: RouteComponent,
  loader: async () => {
    return await actions.store.getProducts({
      limit: 5
    })
  },
  head: () => ({
    meta: [...seo({ title: 'Shop' })]
  })
})

function RouteComponent() {
  return <div>Hello from shop page</div>
}
