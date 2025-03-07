import { Button } from '@medusa-starter/ui/button'
import { PasswordInputForm } from '@medusa-starter/ui/components/form/password-form'
import { LoadingCircleIndicator } from '@medusa-starter/ui/loading-circle-indicator'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { z } from 'zod'
import { actions } from '~web/lib/medusa'
import { resetPasswordPageRouteApi } from '../utils'

const setNewPasswordSchema = z
  .object({
    newPassword: z
      .string({ message: 'New password is required' })
      .min(8, { message: 'New password must be at least 8 characters long' }),
    confirmPassword: z.string({
      message: 'Confirm new password is required'
    })
  })
  .refine(data => data.confirmPassword === data.newPassword, {
    message: 'Confirm password must match new password',
    path: ['confirmPassword']
  })

export const SetNewPasswordForm = () => {
  const { token } = resetPasswordPageRouteApi.useParams()

  const setNewPasswordMutation = useMutation({
    mutationFn: actions.auth.setNewPassword,
    mutationKey: ['actions.auth.setNewPassword'],
    onError: error => {
      toast.error('Failed to change password', {
        description: error.message
      })
    },
    onSuccess: () => {
      toast.error('Password changed successfully')
    }
  })

  const form = useForm({
    onSubmit: ({ value }) => {
      setNewPasswordMutation.mutate({
        password: value.newPassword,
        token
      })
    },
    defaultValues: {
      newPassword: '',
      confirmPassword: ''
    },
    validators: {
      onSubmit: setNewPasswordSchema
    }
  })

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
      <form.Field name="newPassword">
        {field => (
          <PasswordInputForm
            fieldName={field.name}
            label="New password"
            value={field.state.value}
            onChange={e => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            disabled={setNewPasswordMutation.isPending}
            errorMessage={field.state.meta.errors?.[0]?.message}
          />
        )}
      </form.Field>

      <form.Field name="confirmPassword">
        {field => (
          <PasswordInputForm
            fieldName={field.name}
            label="Confirm password"
            value={field.state.value}
            onChange={e => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            disabled={setNewPasswordMutation.isPending}
            errorMessage={field.state.meta.errors?.[0]?.message}
          />
        )}
      </form.Field>

      <Button
        type="submit"
        disabled={setNewPasswordMutation.isPending}
      >
        {setNewPasswordMutation.isPending && <LoadingCircleIndicator />}
        Update Profile
      </Button>
    </form>
  )
}
