import { Button } from '@medusa-starter/ui/button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useSyncAuthToken } from '~web/hooks/useSyncAuthToken'
import { actions } from '~web/lib/medusa'
import { getMeQueryOptions } from '../actions'

export const ChangePassword = () => {
  const token = useSyncAuthToken()
  const getMeQuery = useQuery(getMeQueryOptions(token))
  const email = getMeQuery.data?.customer.email

  const navigate = useNavigate()
  const changePasswordMutation = useMutation({
    mutationFn: email
      ? () => actions.auth.resetPassword({ identifier: email })
      : undefined,
    mutationKey: ['actions.auth.setNewPassword'],
    onError: error => {
      toast.error('Failed to send password reset email', {
        description: error.message
      })
    },
    onSuccess: () => {
      toast.success('Password reset email sent successfully', {
        description: 'Check your email to reset your password'
      })
      navigate({
        to: '/profile/details'
      })
    }
  })

  return (
    <div className="flex flex-col gap-6">
      <p className="text-muted-foreground text-sm text-balance">
        Click the button below to send a password reset email to{' '}
        <span className="font-semibold">{email}</span> and we will send you a
        link to reset your password.
      </p>
      <Button
        onClick={() => changePasswordMutation.mutate()}
        className="capitalize md:self-start"
        disabled={changePasswordMutation.isPending || getMeQuery.isPending}
      >
        Send password reset email
      </Button>
    </div>
  )
}
