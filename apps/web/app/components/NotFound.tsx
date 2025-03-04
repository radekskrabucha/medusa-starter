import { Button, buttonVariants } from '@medusa-starter/ui/button'
import { Link } from '@tanstack/react-router'

export const NotFound: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="layout-container flex-1">
    <section className="layout-section flex-1 items-center justify-center gap-4 text-center">
      <h1 className="text-primary text-6xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold">Page Not Found</h2>
      <p className="text-muted-foreground">
        {children || (
          <span>
            The page you are looking for does not exist or has been moved.
          </span>
        )}
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <Button onClick={() => window.history.back()}>Go back</Button>
        <Link
          to="/"
          className={buttonVariants({ variant: 'secondary' })}
        >
          Start Over
        </Link>
      </div>
    </section>
  </div>
)
