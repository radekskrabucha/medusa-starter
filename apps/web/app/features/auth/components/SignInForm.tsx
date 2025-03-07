import { InputForm } from '@medusa-starter/ui/components/form/input-form'
import { PasswordInputForm } from '@medusa-starter/ui/components/form/password-form'
import { SubmitButton } from '@medusa-starter/ui/components/form/submit-button'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { z } from 'zod'
import { actions } from '~web/lib/medusa'
import { onLogIn, signInPageRouteApi } from '../utils'

const signInSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

export const SignInForm = () => {
  const navigate = useNavigate()
  const { redirect } = signInPageRouteApi.useSearch()
  const signInMutation = useMutation({
    mutationFn: actions.auth.logInWithEmail,
    mutationKey: ['actions.auth.logInWithEmail'],
    onError: error => {
      toast.error('Sign in failed', {
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
    onSubmit: ({ value }) => {
      signInMutation.mutate(value)
    },
    defaultValues: {
      email: '',
      password: ''
    },
    validators: {
      onSubmit: signInSchema
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
      <form.Field name="email">
        {field => (
          <InputForm
            fieldName={field.name}
            label="Email"
            value={field.state.value}
            onChange={e => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder="john@example.com"
            disabled={signInMutation.isPending}
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
            placeholder="••••••••"
            disabled={signInMutation.isPending}
            errorMessage={field.state.meta.errors?.[0]?.message}
          />
        )}
      </form.Field>

      <SubmitButton isPending={signInMutation.isPending} />
    </form>
  )
}
