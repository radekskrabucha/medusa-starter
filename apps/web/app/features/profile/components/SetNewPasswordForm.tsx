import { Button } from '@medusa-starter/ui/button'
import { PasswordInput } from '@medusa-starter/ui/input'
import { Label } from '@medusa-starter/ui/label'
import { LoadingCircleIndicator } from '@medusa-starter/ui/loading-circle-indicator'
import { StatusMessage } from '@medusa-starter/ui/status-message'
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
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.name}>New password</Label>
            <PasswordInput
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              disabled={setNewPasswordMutation.isPending}
            />
            {field.state.meta.errors ? (
              <StatusMessage variant="error">
                {field.state.meta.errors[0]?.message}
              </StatusMessage>
            ) : null}
          </div>
        )}
      </form.Field>

      <form.Field name="confirmPassword">
        {field => (
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.name}>Confirm password</Label>
            <PasswordInput
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              disabled={setNewPasswordMutation.isPending}
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
        disabled={setNewPasswordMutation.isPending}
      >
        {setNewPasswordMutation.isPending && <LoadingCircleIndicator />}
        Update Profile
      </Button>
    </form>
  )
}
