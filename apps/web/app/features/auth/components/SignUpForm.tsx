import { Button } from '@medusa-starter/ui/button'
import { Input } from '@medusa-starter/ui/input'
import { Label } from '@medusa-starter/ui/label'
import { LoadingCircleIndicator } from '@medusa-starter/ui/loading-circle-indicator'
import { StatusMessage } from '@medusa-starter/ui/status-message'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { z } from 'zod'
import { appName } from '~web/config/app'
import { actions } from '~web/lib/medusa'

const signUpSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

export const SignUpForm = () => {
  const signUpMutation = useMutation({
    mutationFn: actions.auth.signUpWithEmail,
    mutationKey: ['actions.auth.signUpWithEmail']
  })
  const form = useForm({
    onSubmit: ({ value }) => {
      signUpMutation.mutate(value)
    },
    defaultValues: {
      email: '',
      password: ''
    },
    validators: {
      onSubmit: signUpSchema
    }
  })

  return (
    <section className="layout-section flex-1 items-center justify-center gap-10">
      <div className="max-w-xl text-center text-balance">
        <h3 className="text-2xl font-bold">Become a {appName} Member</h3>
        <p className="text-muted-foreground mt-3 text-sm">
          Create your {appName} Member profile, and get access to an enhanced
          shopping experience.
        </p>
      </div>

      <form
        className="flex w-full max-w-md flex-col gap-4"
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()

          form.handleSubmit()
        }}
        noValidate
      >
        <form.Field name="email">
          {field => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Email</Label>
              <Input
                id={field.name}
                type="email"
                name={field.name}
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="john@example.com"
                disabled={signUpMutation.isPending}
              />
              {field.state.meta.errors ? (
                <StatusMessage variant="error">
                  {field.state.meta.errors[0]?.message}
                </StatusMessage>
              ) : null}
            </div>
          )}
        </form.Field>

        <form.Field name="password">
          {field => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Password</Label>
              <Input
                id={field.name}
                type="password"
                name={field.name}
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="••••••••"
                disabled={signUpMutation.isPending}
              />
              {field.state.meta.errors ? (
                <StatusMessage variant="error">
                  {field.state.meta.errors[0]?.message}
                </StatusMessage>
              ) : null}
            </div>
          )}
        </form.Field>
        <Button
          type="submit"
          disabled={signUpMutation.isPending}
        >
          {signUpMutation.isPending && <LoadingCircleIndicator />}
          Sign Up
        </Button>
      </form>

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
}
