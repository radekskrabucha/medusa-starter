import { Button } from '@medusa-starter/ui/button'
import type { UseQueryResult } from '@tanstack/react-query'
import {
  DefaultErrorFallback as ErrorFallback,
  NavigateToHomeButton
} from './DefaultErrorFallback'

type NoEmpty<T> = T extends null | false | undefined ? never : T

type QueryBoundaryProps<T = unknown, E extends Error = Error> = {
  query: UseQueryResult<T, E>
  loadingFallback?: React.ReactNode
  noDataFallback?: React.ReactNode
  errorFallback?: (errorFallbackProps: ErrorFallbackProps<E>) => React.ReactNode
  children: (data: NoEmpty<T>) => React.ReactNode
  isDataEmpty?: (data: T | undefined) => boolean
}

export function QueryBoundary<T = unknown, E extends Error = Error>({
  query,
  children,
  loadingFallback,
  noDataFallback,
  errorFallback,
  isDataEmpty
}: QueryBoundaryProps<T, E>) {
  if (query.error) {
    return errorFallback ? (
      errorFallback({
        error: query.error,
        retry: async () => {
          await query.refetch()
        },
        errorUpdateCount: query.errorUpdateCount
      })
    ) : (
      <DefaultErrorFallback
        error={query.error}
        retry={async () => {
          await query.refetch()
        }}
        errorUpdateCount={query.errorUpdateCount}
      />
    )
  }
  if (query.isPending) {
    return loadingFallback
  }
  if (
    (!query.isFetching && isDataEmpty && isDataEmpty(query.data)) ||
    (!query.isFetching && !query.data) ||
    (!query.isFetching && Array.isArray(query.data) && query.data.length === 0)
  ) {
    return noDataFallback ? noDataFallback : <DefaultNoDataFallback />
  }

  return children(query.data as NoEmpty<T>)
}

type ErrorFallbackProps<E extends Error = Error> = {
  error: E
  retry: () => void
  errorUpdateCount: number
}

export const DefaultErrorFallback = ({
  error,
  retry,
  errorUpdateCount
}: ErrorFallbackProps) => {
  const canRetry = errorUpdateCount < 3

  return (
    <ErrorFallback error={error}>
      <div className="flex flex-wrap items-center gap-4">
        {canRetry && <Button onClick={retry}>Retry</Button>}
        <NavigateToHomeButton />
      </div>
    </ErrorFallback>
  )
}

export const DefaultNoDataFallback = () => (
  <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center text-balance">
    <h2 className="text-3xl font-bold">Oopss... not found.</h2>
    <p className="text-foreground-secondary">
      Seems like there is nothing here yet.
    </p>
  </div>
)
