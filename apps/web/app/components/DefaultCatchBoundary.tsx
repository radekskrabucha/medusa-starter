import { Button, buttonVariants } from '@medusa-starter/ui/button'
import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter
} from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'

export const DefaultCatchBoundary: React.FC<ErrorComponentProps> = ({
  error
}) => {
  const router = useRouter()
  const isRoot = useMatch({
    strict: false,
    select: state => state.id === rootRouteId
  })

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-6 p-4">
      <ErrorComponent error={error} />
      <div className="flex flex-wrap items-center gap-4">
        <Button
          onClick={() => {
            router.invalidate()
          }}
        >
          Try Again
        </Button>
        {isRoot ? (
          <Link
            to="/"
            className={buttonVariants({ variant: 'secondary' })}
          >
            Home
          </Link>
        ) : (
          <Link
            to="/"
            className={buttonVariants({ variant: 'secondary' })}
            onClick={e => {
              e.preventDefault()
              window.history.back()
            }}
          >
            Go Back
          </Link>
        )}
      </div>
    </div>
  )
}
