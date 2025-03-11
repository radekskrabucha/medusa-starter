import { InputForm } from '@medusa-starter/ui/components/form/input-form'
import { SubmitButton } from '@medusa-starter/ui/components/form/submit-button'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { useResetPassword } from '../hooks/useResetPassword'

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email')
})

export const ForgotPasswordForm = () => {
  const resetPasswordMutation = useResetPassword({
    onError: error => {
      toast.error('Failed to send password reset email', {
        description: error.message
      })
    }
  })

  const form = useForm({
    onSubmit: ({ value }) => {
      resetPasswordMutation.mutate({ identifier: value.email })
    },
    defaultValues: {
      email: ''
    },
    validators: {
      onSubmit: forgotPasswordSchema
    }
  })

  if (
    resetPasswordMutation.isSuccess &&
    resetPasswordMutation.variables.identifier
  ) {
    return (
      <div className="max-w-md text-center text-balance">
        <p className="text-muted-foreground text-sm text-balance">
          We have sent you an email to{' '}
          <span className="font-semibold">
            {resetPasswordMutation.variables.identifier}
          </span>{' '}
          with a link to reset your password.
        </p>
        <p className="text-muted-foreground mt-2 text-sm text-balance">
          Check your email and follow the instructions.
        </p>
      </div>
    )
  }

  return (
    <form
      className="flex w-full max-w-md flex-col gap-4 max-sm:max-w-none"
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
            type="email"
            placeholder="john@example.com"
            value={field.state.value}
            onChange={e => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            disabled={resetPasswordMutation.isPending}
            errorMessage={field.state.meta.errors?.[0]?.message}
          />
        )}
      </form.Field>

      <SubmitButton
        isPending={resetPasswordMutation.isPending}
        text="Send reset email"
      />
    </form>
  )
}
