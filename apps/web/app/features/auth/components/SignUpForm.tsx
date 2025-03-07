import { Button } from '@medusa-starter/ui/button'
import { InputForm } from '@medusa-starter/ui/components/form/input-form'
import { PasswordInputForm } from '@medusa-starter/ui/components/form/password-form'
import { LoadingCircleIndicator } from '@medusa-starter/ui/loading-circle-indicator'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { z } from 'zod'
import { actions } from '~web/lib/medusa'
import { onLogIn } from '../utils'

const signUpSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

export const SignUpForm = () => {
  const navigate = useNavigate()
  const signUpMutation = useMutation({
    mutationFn: actions.auth.signUpWithEmail,
    mutationKey: ['actions.auth.signUpWithEmail'],
    onError: error => {
      toast.error('Sign up failed', {
        description: error.message
      })
    },
    onSuccess: () => {
      onLogIn()
      navigate({
        to: '/'
      })
    }
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
      <Button
        type="submit"
        disabled={signUpMutation.isPending}
      >
        {signUpMutation.isPending && <LoadingCircleIndicator />}
        Sign Up
      </Button>
    </form>
  )
}
