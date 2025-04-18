import { Link } from '@tanstack/react-router'
import { SignInForm } from './components/SignInForm'
import { signInPageRouteApi } from './utils'

export const SignInPage = () => {
  const { redirect } = signInPageRouteApi.useSearch()

  return (
    <section className="layout-section flex-1 items-center justify-center gap-10">
      <div className="max-w-xl text-center text-balance">
        <h3 className="text-2xl font-bold capitalize">Welcome back</h3>
        <p className="text-muted-foreground mt-3 text-sm">
          Sign in to access an enhanced shopping experience.
        </p>
      </div>
      <SignInForm redirect={redirect} />
      <div className="max-w-xl text-center text-balance">
        <p className="text-muted-foreground text-sm">
          Not a member?{' '}
          <Link
            to="/sign-up"
            search={{ redirect }}
            className="hover:text-foreground underline underline-offset-4 transition-colors"
          >
            Join us
          </Link>
        </p>
      </div>
    </section>
  )
}
