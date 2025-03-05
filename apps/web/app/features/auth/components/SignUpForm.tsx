import { Button } from '@medusa-starter/ui/button'
import { Input, PasswordInput } from '@medusa-starter/ui/input'
import { Label } from '@medusa-starter/ui/label'
import { LoadingCircleIndicator } from '@medusa-starter/ui/loading-circle-indicator'
import { StatusMessage } from '@medusa-starter/ui/status-message'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
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
            <PasswordInput
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
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
  )
}
