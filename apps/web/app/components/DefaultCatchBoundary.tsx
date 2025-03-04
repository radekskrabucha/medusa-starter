import { Button } from '@medusa-starter/ui/button'
import { useRouter } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'
import {
  DefaultErrorFallback,
  NavigateToHomeButton
} from './DefaultErrorFallback'

export const DefaultCatchBoundary: React.FC<ErrorComponentProps> = ({
  error
}) => {
  const router = useRouter()

  return (
    <DefaultErrorFallback error={error}>
      <div className="flex flex-wrap items-center gap-4">
        <Button
          onClick={() => {
            router.invalidate()
          }}
        >
          Try Again
        </Button>
        <NavigateToHomeButton />
      </div>
    </DefaultErrorFallback>
  )
}
