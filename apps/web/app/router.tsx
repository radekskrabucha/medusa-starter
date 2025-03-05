import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'
import {
  getQueryClient,
  QUERY_CACHE_TIME,
  QUERY_STALE_TIME
} from '~web/lib/reactQuery'
import { DefaultCatchBoundary } from './components/DefaultCatchBoundary'
import { NotFound } from './components/NotFound'
import { routeTree } from './routeTree.gen'

export function createRouter() {
  const queryClient = getQueryClient()

  const router = createTanStackRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: 'intent',
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    defaultGcTime: QUERY_CACHE_TIME,
    defaultPreloadGcTime: QUERY_CACHE_TIME,
    defaultStaleTime: QUERY_STALE_TIME,
    defaultPreloadStaleTime: QUERY_STALE_TIME
  })

  return routerWithQueryClient(router, queryClient)
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
