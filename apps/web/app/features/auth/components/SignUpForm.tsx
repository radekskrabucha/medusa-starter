import { InputForm } from '@medusa-starter/ui/components/form/input-form'
import { PasswordInputForm } from '@medusa-starter/ui/components/form/password-form'
import { SubmitButton } from '@medusa-starter/ui/components/form/submit-button'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { z } from 'zod'
import { handleSignUp } from '../actions'
import { onLogIn, signUpPageRouteApi } from '../utils'

const signUpSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string(),
  lastName: z.string()
})

export const SignUpForm = () => {
  const navigate = useNavigate()
  const { redirect } = signUpPageRouteApi.useSearch()
  const signUpMutation = useMutation({
    mutationFn: handleSignUp,
    mutationKey: ['handleSignUp'],
    onError: error => {
      toast.error('Sign up failed', {
        description: error.message
      })
    },
    onSuccess: () => {
      onLogIn()
      navigate({
        to: redirect ?? '/'
      })
    }
  })
  const form = useForm({
    onSubmit: ({ value: { password, email, firstName, lastName } }) => {
      signUpMutation.mutate({
        createCustomerParams: {
          body: {
            email,
            first_name: firstName ? firstName : undefined,
            last_name: lastName ? lastName : undefined
          }
        },
        signUpParams: {
          email,
          password
        }
      })
    },
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    },
    validators: {
      onSubmit: signUpSchema
    }
  })

  return (
    <form
      className="flex w-full max-w-md flex-col gap-4"
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()

        form.handleSubmit()
      }}
      noValidate
    >
      <div className="flex gap-4">
        <form.Field name="firstName">
          {field => (
            <InputForm
              fieldName={field.name}
              label="First name"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="John"
              disabled={signUpMutation.isPending}
              errorMessage={field.state.meta.errors?.[0]?.message}
            />
          )}
        </form.Field>

        <form.Field name="lastName">
          {field => (
            <InputForm
              fieldName={field.name}
              label="Last name"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="Doe"
              disabled={signUpMutation.isPending}
              errorMessage={field.state.meta.errors?.[0]?.message}
            />
          )}
        </form.Field>
      </div>
      <form.Field name="email">
        {field => (
          <InputForm
            fieldName={field.name}
            label="Email"
            type="email"
            value={field.state.value}
            onChange={e => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder="john@example.com"
            disabled={signUpMutation.isPending}
            errorMessage={field.state.meta.errors?.[0]?.message}
          />
        )}
      </form.Field>

      <form.Field name="password">
        {field => (
          <PasswordInputForm
            fieldName={field.name}
            label="Password"
            value={field.state.value}
            onChange={e => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            disabled={signUpMutation.isPending}
            errorMessage={field.state.meta.errors?.[0]?.message}
          />
        )}
      </form.Field>
      <span className="text-muted-foreground text-xs">
        By signing up, you agree to the{' '}
        <Link
          to="/privacy-policy"
          className="hover:text-foreground underline underline-offset-4 transition-colors"
        >
          Privacy Policy
        </Link>{' '}
        and{' '}
        <Link
          to="/terms-and-conditions"
          className="hover:text-foreground underline underline-offset-4 transition-colors"
        >
          Terms and Conditions
        </Link>
        .
      </span>
      <SubmitButton
        isPending={signUpMutation.isPending}
        text="Sign Up"
      />
    </form>
  )
}
