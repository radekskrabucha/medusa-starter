import { SetNewPasswordForm } from './components/SetNewPasswordForm'

export const SetNewPasswordPage = () => (
  <section className="layout-section flex-1 items-center justify-center gap-10">
    <div className="max-w-xl text-center text-balance">
      <h3 className="text-2xl font-bold capitalize">Reset Password</h3>
      <p className="text-muted-foreground mt-3 text-sm">
        Enter a new password for your account.
      </p>
    </div>
    <SetNewPasswordForm />
  </section>
)
