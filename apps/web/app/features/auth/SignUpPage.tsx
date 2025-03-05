import { Link } from '@tanstack/react-router'
import { appName } from '~web/config/app'
import { SignUpForm } from './components/SignUpForm'

export const SignUpPage = () => (
  <section className="layout-section flex-1 items-center justify-center gap-10">
    <div className="max-w-xl text-center text-balance">
      <h3 className="text-2xl font-bold">Become a {appName} Member</h3>
      <p className="text-muted-foreground mt-3 text-sm">
        Create your {appName} Member profile, and get access to an enhanced
        shopping experience.
      </p>
    </div>

    <SignUpForm />

    <div className="max-w-xl text-center text-balance">
      <p className="text-muted-foreground text-sm">
        Already a member?{' '}
        <Link
          to="/sign-in"
          className="hover:text-foreground underline underline-offset-4 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  </section>
)
